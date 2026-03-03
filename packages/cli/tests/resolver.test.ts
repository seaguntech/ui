import { resolveRegistryItemsWithDependencies } from '../src/core/resolver.js';
import { describe, expect, it } from 'vitest';

describe('resolveRegistryItemsWithDependencies', () => {
  it('resolves transitive dependencies in topological order', async () => {
    const graph = {
      button: {
        name: 'button',
        type: 'registry:ui',
        registryDependencies: ['utils'] as string[],
        files: [],
      },
      utils: {
        name: 'utils',
        type: 'registry:lib',
        registryDependencies: [] as string[],
        files: [],
      },
    };

    const result = await resolveRegistryItemsWithDependencies({
      names: ['button'],
      fetchItem: async (name) => ({
        ...graph[name as keyof typeof graph],
      }),
    });

    expect(result.map((item) => item.name)).toEqual(['utils', 'button']);
  });

  it('throws for cyclic dependencies', async () => {
    const graph = {
      a: {
        name: 'a',
        type: 'registry:ui',
        registryDependencies: ['b'] as string[],
        files: [],
      },
      b: {
        name: 'b',
        type: 'registry:ui',
        registryDependencies: ['a'] as string[],
        files: [],
      },
    };

    await expect(
      resolveRegistryItemsWithDependencies({
        names: ['a'],
        fetchItem: async (name) => ({
          ...graph[name as keyof typeof graph],
        }),
      }),
    ).rejects.toThrow('Detected cyclic registry dependency');
  });
});
