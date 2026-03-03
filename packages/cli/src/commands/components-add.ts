import { resolveRegistryUrl } from '../core/config.js';
import {
  detectPackageManager,
  getMissingDependencies,
  installDependencies,
  readProjectPackageJson,
} from '../core/dependency-installer.js';
import {
  type ConflictPolicy,
  writeRegistryFiles,
} from '../core/file-writer.js';
import { info } from '../core/logger.js';
import { fetchRegistryItem } from '../core/registry-client.js';
import { resolveRegistryItemsWithDependencies } from '../core/resolver.js';

type AddOptions = {
  cwd: string;
  registry?: string;
  yes?: boolean;
  skipInstall?: boolean;
  dryRun?: boolean;
};

export async function runComponentsAdd(names: string[], options: AddOptions) {
  if (names.length === 0) {
    throw new Error('Please provide at least one component name.');
  }

  const registryUrl = await resolveRegistryUrl({
    cwd: options.cwd,
    registry: options.registry,
  });
  const uniqueNames = Array.from(new Set(names));

  info(`Using registry: ${registryUrl}`);
  info(`Resolving ${uniqueNames.length} component(s)...`);

  const items = await resolveRegistryItemsWithDependencies({
    names: uniqueNames,
    fetchItem: async (name) => fetchRegistryItem(registryUrl, name),
  });

  const files = items.flatMap((item) => item.files);
  const packageDependencies = Array.from(
    new Set(items.flatMap((item) => item.dependencies ?? [])),
  ).sort();

  const writePolicy: ConflictPolicy = options.yes ? 'overwrite' : 'fail';
  const writeResult = await writeRegistryFiles({
    cwd: options.cwd,
    files,
    policy: writePolicy,
    dryRun: options.dryRun,
  });

  info(`Files written: ${writeResult.written.length}`);
  if (writeResult.skipped.length > 0) {
    info(`Files skipped: ${writeResult.skipped.length}`);
  }

  if (!options.skipInstall) {
    const packageManager = await detectPackageManager(options.cwd);
    const packageJson = await readProjectPackageJson(options.cwd);
    const missing = getMissingDependencies(packageJson, packageDependencies);

    if (missing.length > 0) {
      info(
        `Installing ${missing.length} dependency(ies) with ${packageManager}...`,
      );
      await installDependencies({
        cwd: options.cwd,
        packageManager,
        dependencies: missing,
        dryRun: options.dryRun,
      });
    } else {
      info('No new npm dependencies to install.');
    }
  }

  info(`Done. Added ${names.join(', ')}.`);
}
