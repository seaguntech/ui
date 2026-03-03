import { readSeagunConfig, writeSeagunConfig } from '../core/config.js';
import { DEFAULT_REGISTRY_URL } from '../core/constants.js';
import { info } from '../core/logger.js';

type InitOptions = {
  cwd: string;
  registry?: string;
  force?: boolean;
};

export async function runInit(options: InitOptions) {
  const existing = await readSeagunConfig(options.cwd);
  if (existing && !options.force) {
    throw new Error('Config already exists. Use --force to overwrite it.');
  }

  const configPath = await writeSeagunConfig(options.cwd, {
    registry: options.registry ?? DEFAULT_REGISTRY_URL,
  });

  info(`Created ${configPath}`);
}
