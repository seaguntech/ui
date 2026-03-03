import type { RegistryItem } from '../types.js';

type ResolveOptions = {
  names: string[];
  fetchItem: (name: string) => Promise<RegistryItem>;
};

export async function resolveRegistryItemsWithDependencies(
  options: ResolveOptions,
) {
  const visited = new Set<string>();
  const stack = new Set<string>();
  const resolved: RegistryItem[] = [];

  async function dfs(name: string) {
    if (visited.has(name)) {
      return;
    }

    if (stack.has(name)) {
      throw new Error(`Detected cyclic registry dependency at '${name}'`);
    }

    stack.add(name);
    const item = await options.fetchItem(name);
    const deps = item.registryDependencies ?? [];

    for (const dependency of deps) {
      await dfs(dependency);
    }

    stack.delete(name);
    visited.add(name);
    resolved.push(item);
  }

  for (const name of options.names) {
    await dfs(name);
  }

  return resolved;
}
