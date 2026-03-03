import type { RegistryBuiltFile } from '../types.js';
import { detectProjectLayout, resolveWriteTarget } from './project-layout.js';
import fsExtra from 'fs-extra';
import path from 'node:path';

export type ConflictPolicy = 'fail' | 'overwrite' | 'skip';

type WriteOptions = {
  cwd: string;
  files: RegistryBuiltFile[];
  policy: ConflictPolicy;
  dryRun?: boolean;
};

type WriteResult = {
  written: string[];
  skipped: string[];
};

export async function writeRegistryFiles(
  options: WriteOptions,
): Promise<WriteResult> {
  const projectLayout = await detectProjectLayout(options.cwd);
  const written: string[] = [];
  const skipped: string[] = [];
  const createdFiles: string[] = [];
  const overwrittenFiles = new Map<string, string>();

  try {
    for (const file of options.files) {
      const relativeTarget = resolveWriteTarget({
        targetOrPath: file.target ?? file.path,
        sourceRootPrefix: projectLayout.sourceRootPrefix,
      });
      const targetPath = path.join(options.cwd, relativeTarget);
      const exists = await fsExtra.pathExists(targetPath);

      if (exists) {
        const currentContent = await fsExtra.readFile(targetPath, 'utf-8');
        if (isSameContent(currentContent, file.content)) {
          skipped.push(relativeTarget);
          continue;
        }
      }

      if (exists && options.policy === 'skip') {
        skipped.push(relativeTarget);
        continue;
      }

      if (exists && options.policy === 'fail') {
        throw new Error(`File already exists: ${relativeTarget}`);
      }

      if (options.dryRun) {
        written.push(relativeTarget);
        continue;
      }

      await fsExtra.ensureDir(path.dirname(targetPath));

      if (exists) {
        const currentContent = await fsExtra.readFile(targetPath, 'utf-8');
        overwrittenFiles.set(targetPath, currentContent);
      } else {
        createdFiles.push(targetPath);
      }

      await fsExtra.writeFile(targetPath, file.content, 'utf-8');
      written.push(relativeTarget);
    }
  } catch (error) {
    if (!options.dryRun) {
      await rollbackWrites(createdFiles, overwrittenFiles);
    }

    throw error;
  }

  return { written, skipped };
}

async function rollbackWrites(
  createdFiles: string[],
  overwrittenFiles: Map<string, string>,
) {
  await Promise.all(createdFiles.map((file) => fsExtra.remove(file)));

  for (const [filePath, originalContent] of overwrittenFiles.entries()) {
    await fsExtra.writeFile(filePath, originalContent, 'utf-8');
  }
}

function isSameContent(currentContent: string, incomingContent: string) {
  return (
    normalizeLineEndings(currentContent) ===
    normalizeLineEndings(incomingContent)
  );
}

function normalizeLineEndings(value: string) {
  return value.replace(/\r\n/g, '\n');
}
