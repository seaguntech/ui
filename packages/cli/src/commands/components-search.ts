import { resolveRegistryUrl } from '../core/config.js';
import { info } from '../core/logger.js';
import { fetchRegistryIndex } from '../core/registry-client.js';

type SearchOptions = {
  cwd: string;
  registry?: string;
};

export async function runComponentsSearch(
  keyword: string,
  options: SearchOptions,
) {
  const normalized = keyword.trim().toLowerCase();
  if (!normalized) {
    throw new Error('Keyword cannot be empty.');
  }

  const registryUrl = await resolveRegistryUrl({
    cwd: options.cwd,
    registry: options.registry,
  });
  const index = await fetchRegistryIndex(registryUrl);
  const matches = index.items.filter((item) => {
    const haystack = `${item.name} ${item.description ?? ''} ${item.type}`;
    return haystack.toLowerCase().includes(normalized);
  });

  info(`Registry: ${registryUrl}`);
  info(`Matches: ${matches.length}`);
  for (const item of matches) {
    info(`- ${item.name} (${item.type})`);
  }
}
