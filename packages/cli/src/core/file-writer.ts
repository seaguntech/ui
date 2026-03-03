import type { RegistryBuiltFile } from '../types.js';
import { ensureDir, pathExists, readFile, remove, writeFile } from 'fs-extra';
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
  const written: string[] = [];
  const skipped: string[] = [];
  const createdFiles: string[] = [];
  const overwrittenFiles = new Map<string, string>();

  try {
    for (const file of options.files) {
      const relativeTarget = sanitizeRelativePath(file.target ?? file.path);
      const targetPath = path.join(options.cwd, relativeTarget);
      const exists = await pathExists(targetPath);

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

      await ensureDir(path.dirname(targetPath));

      if (exists) {
        const currentContent = await readFile(targetPath, 'utf-8');
        overwrittenFiles.set(targetPath, currentContent);
      } else {
        createdFiles.push(targetPath);
      }

      await writeFile(targetPath, file.content, 'utf-8');
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

function sanitizeRelativePath(relativePath: string) {
  const normalized = path.normalize(relativePath).replace(/^([/\\])+/, '');

  if (path.isAbsolute(normalized) || normalized.startsWith('..')) {
    throw new Error(`Unsafe target path: ${relativePath}`);
  }

  return normalized;
}

async function rollbackWrites(
  createdFiles: string[],
  overwrittenFiles: Map<string, string>,
) {
  await Promise.all(createdFiles.map((file) => remove(file)));

  for (const [filePath, originalContent] of overwrittenFiles.entries()) {
    await writeFile(filePath, originalContent, 'utf-8');
  }
}
