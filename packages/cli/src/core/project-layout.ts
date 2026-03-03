import fsExtra from 'fs-extra';
import path from 'node:path';

type ProjectLayout = {
  sourceRootPrefix: '' | 'src';
};

export async function detectProjectLayout(cwd: string): Promise<ProjectLayout> {
  const hasSrcDir = await fsExtra.pathExists(path.join(cwd, 'src'));
  if (!hasSrcDir) {
    return { sourceRootPrefix: '' };
  }

  const usesSrcAlias = await projectUsesSrcAlias(cwd);
  return {
    sourceRootPrefix: usesSrcAlias ? 'src' : '',
  };
}

async function projectUsesSrcAlias(cwd: string) {
  const configCandidates = ['tsconfig.json', 'jsconfig.json'];

  for (const configName of configCandidates) {
    const configPath = path.join(cwd, configName);
    if (!(await fsExtra.pathExists(configPath))) {
      continue;
    }

    const content = await fsExtra.readFile(configPath, 'utf-8');
    const normalized = content.replace(/\s+/g, '');
    if (
      normalized.includes('"@/*":["./src/*"]') ||
      normalized.includes('"@/*":["src/*"]')
    ) {
      return true;
    }
  }

  return false;
}

export function resolveWriteTarget(options: {
  targetOrPath: string;
  sourceRootPrefix: '' | 'src';
}) {
  const normalized = sanitizeRelativePath(options.targetOrPath);
  if (!options.sourceRootPrefix) {
    return normalized;
  }

  if (normalized.startsWith('src/')) {
    return normalized;
  }

  if (normalized.startsWith('components/') || normalized.startsWith('lib/')) {
    return `src/${normalized}`;
  }

  return normalized;
}

function sanitizeRelativePath(relativePath: string) {
  const normalized = path.normalize(relativePath).replace(/^([/\\])+/, '');

  if (path.isAbsolute(normalized) || normalized.startsWith('..')) {
    throw new Error(`Unsafe target path: ${relativePath}`);
  }

  return normalized;
}
