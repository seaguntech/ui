import type { SeagunConfig } from '../types.js';
import { CONFIG_FILE_PATH, DEFAULT_REGISTRY_URL } from './constants.js';
import { seagunConfigSchema } from './schemas.js';
import { pathExists, readJson, writeJson } from 'fs-extra';
import path from 'node:path';

export async function readSeagunConfig(
  cwd: string,
): Promise<SeagunConfig | null> {
  const configPath = path.join(cwd, CONFIG_FILE_PATH);

  if (!(await pathExists(configPath))) {
    return null;
  }

  const raw = await readJson(configPath);
  return seagunConfigSchema.parse(raw);
}

export async function writeSeagunConfig(cwd: string, config: SeagunConfig) {
  const configPath = path.join(cwd, CONFIG_FILE_PATH);
  await writeJson(configPath, config, { spaces: 2 });
  return configPath;
}

export async function resolveRegistryUrl(options: {
  cwd: string;
  registry?: string;
}) {
  if (options.registry) {
    return trimTrailingSlash(options.registry);
  }

  const saved = await readSeagunConfig(options.cwd);
  if (saved?.registry) {
    return trimTrailingSlash(saved.registry);
  }

  if (process.env.REGISTRY_URL) {
    return trimTrailingSlash(process.env.REGISTRY_URL);
  }

  return DEFAULT_REGISTRY_URL;
}

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, '');
}
