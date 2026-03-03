import { resolveRegistryUrl } from '../core/config.js';
import { error, info } from '../core/logger.js';
import {
  fetchRegistriesIndex,
  fetchRegistryIndex,
} from '../core/registry-client.js';
import { pathExists } from 'fs-extra';
import path from 'node:path';

type DoctorOptions = {
  cwd: string;
  registry?: string;
};

export async function runDoctor(options: DoctorOptions) {
  let hasErrors = false;

  const major = Number.parseInt(process.versions.node.split('.')[0] ?? '0', 10);
  if (major >= 20) {
    info(`PASS Node.js ${process.versions.node}`);
  } else {
    error(`Node.js >=20 is required. Current: ${process.versions.node}`);
    hasErrors = true;
  }

  const packageJsonExists = await pathExists(
    path.join(options.cwd, 'package.json'),
  );
  if (packageJsonExists) {
    info(`PASS package.json found in ${options.cwd}`);
  } else {
    error(`package.json not found in ${options.cwd}`);
    hasErrors = true;
  }

  const registryUrl = await resolveRegistryUrl({
    cwd: options.cwd,
    registry: options.registry,
  });

  try {
    await fetchRegistriesIndex(registryUrl);
    await fetchRegistryIndex(registryUrl);
    info(`PASS Registry reachable: ${registryUrl}`);
  } catch (registryError) {
    error(
      `Registry check failed: ${
        registryError instanceof Error
          ? registryError.message
          : String(registryError)
      }`,
    );
    hasErrors = true;
  }

  if (hasErrors) {
    process.exitCode = 1;
  }
}
