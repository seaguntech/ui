import type { PackageManager, RegistryBuiltFile } from '../types.js';
import { execa } from 'execa';
import fsExtra from 'fs-extra';
import path from 'node:path';

const LOCKFILE_PRIORITY: Array<[PackageManager, string]> = [
  ['pnpm', 'pnpm-lock.yaml'],
  ['yarn', 'yarn.lock'],
  ['npm', 'package-lock.json'],
  ['bun', 'bun.lockb'],
];

export async function detectPackageManager(
  cwd: string,
): Promise<PackageManager> {
  for (const [manager, lockFile] of LOCKFILE_PRIORITY) {
    const exists = await fsExtra.pathExists(path.join(cwd, lockFile));
    if (exists) {
      return manager;
    }
  }

  return 'pnpm';
}

export async function readProjectPackageJson(cwd: string) {
  const packageJsonPath = path.join(cwd, 'package.json');

  if (!(await fsExtra.pathExists(packageJsonPath))) {
    throw new Error(`package.json not found in ${cwd}`);
  }

  return fsExtra.readJson(packageJsonPath);
}

export function getMissingDependencies(
  packageJson: Record<string, unknown>,
  dependencies: string[],
) {
  const declared = {
    ...(isObject(packageJson.dependencies) ? packageJson.dependencies : {}),
    ...(isObject(packageJson.devDependencies)
      ? packageJson.devDependencies
      : {}),
    ...(isObject(packageJson.peerDependencies)
      ? packageJson.peerDependencies
      : {}),
  } as Record<string, string>;

  return dependencies.filter((dependency) => !declared[dependency]);
}

export function inferExternalDependenciesFromFiles(files: RegistryBuiltFile[]) {
  const detected = new Set<string>();

  for (const file of files) {
    const modules = extractModuleSpecifiers(file.content);
    for (const specifier of modules) {
      const packageName = normalizePackageName(specifier);
      if (!packageName) {
        continue;
      }

      if (
        packageName === 'react' ||
        packageName === 'react-dom' ||
        packageName === 'next'
      ) {
        continue;
      }

      detected.add(packageName);
    }
  }

  return Array.from(detected);
}

export async function installDependencies(options: {
  cwd: string;
  packageManager: PackageManager;
  dependencies: string[];
  dryRun?: boolean;
}) {
  if (options.dependencies.length === 0) {
    return;
  }

  if (options.dryRun) {
    return;
  }

  const argsByManager: Record<PackageManager, string[]> = {
    pnpm: ['add', ...options.dependencies],
    npm: ['install', ...options.dependencies],
    yarn: ['add', ...options.dependencies],
    bun: ['add', ...options.dependencies],
  };

  await execa(options.packageManager, argsByManager[options.packageManager], {
    cwd: options.cwd,
    stdio: 'inherit',
  });
}

function isObject(value: unknown): value is Record<string, string> {
  return typeof value === 'object' && value !== null;
}

function extractModuleSpecifiers(sourceCode: string) {
  const values = new Set<string>();
  const importFromRegex = /from\s+['"]([^'"]+)['"]/g;
  const directImportRegex = /import\s+['"]([^'"]+)['"]/g;
  const dynamicImportRegex = /import\(\s*['"]([^'"]+)['"]\s*\)/g;

  for (const regex of [
    importFromRegex,
    directImportRegex,
    dynamicImportRegex,
  ]) {
    let match = regex.exec(sourceCode);
    while (match) {
      const value = match[1];
      if (value) {
        values.add(value);
      }
      match = regex.exec(sourceCode);
    }
  }

  return Array.from(values);
}

function normalizePackageName(specifier: string) {
  if (
    specifier.startsWith('.') ||
    specifier.startsWith('/') ||
    specifier.startsWith('@/') ||
    specifier.startsWith('~/') ||
    specifier.startsWith('node:') ||
    specifier.startsWith('#')
  ) {
    return null;
  }

  if (specifier.startsWith('@')) {
    const [scope, name] = specifier.split('/');
    if (!scope || !name) {
      return null;
    }
    return `${scope}/${name}`;
  }

  const [name] = specifier.split('/');
  return name ?? null;
}
