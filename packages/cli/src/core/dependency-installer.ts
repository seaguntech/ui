import type { PackageManager } from '../types.js';
import { execa } from 'execa';
import { pathExists, readJson } from 'fs-extra';
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
    const exists = await pathExists(path.join(cwd, lockFile));
    if (exists) {
      return manager;
    }
  }

  return 'pnpm';
}

export async function readProjectPackageJson(cwd: string) {
  const packageJsonPath = path.join(cwd, 'package.json');

  if (!(await pathExists(packageJsonPath))) {
    throw new Error(`package.json not found in ${cwd}`);
  }

  return readJson(packageJsonPath);
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
