import { resolveRegistryUrl } from '../core/config.js';
import { info } from '../core/logger.js';
import { fetchRegistryIndex } from '../core/registry-client.js';

type ListOptions = {
  cwd: string;
  registry?: string;
};

export async function runComponentsList(options: ListOptions) {
  const registryUrl = await resolveRegistryUrl({
    cwd: options.cwd,
    registry: options.registry,
  });
  const index = await fetchRegistryIndex(registryUrl);

  info(`Registry: ${registryUrl}`);
  info(`Items: ${index.items.length}`);

  for (const item of index.items) {
    info(`- ${item.name} (${item.type})`);
  }
}
