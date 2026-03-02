import { buildRegistry } from '../scripts/build-registry';
import { validateRegistryOutputs } from '../scripts/validate-registries';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const OUTPUT_DIR = path.join(process.cwd(), 'public/r');

describe('registry build pipeline', () => {
  it('generates core artifacts and valid JSON files', async () => {
    await buildRegistry();

    const files = await readdir(OUTPUT_DIR);
    expect(files).toContain('registry.json');
    expect(files).toContain('registries.json');
    expect(files).toContain('all.json');
    expect(files).toContain('button.json');
    expect(files).toContain('voice-assistant-01.json');
    expect(files).toContain('dialog-demo.json');

    const registryIndexContent = await readFile(
      path.join(OUTPUT_DIR, 'registry.json'),
      'utf-8',
    );
    const registryIndex = JSON.parse(registryIndexContent) as {
      items: { name: string }[];
    };
    const itemNames = registryIndex.items.map((item) => item.name);

    expect(itemNames).toContain('dropdown-menu');
    expect(itemNames).toContain('workspace-quick-actions-01');
    expect(itemNames).toContain('tabs-demo');
  });

  it('passes registry schema validation', async () => {
    await validateRegistryOutputs();
  });

  it('keeps registry index unique and typed', async () => {
    const registryIndexContent = await readFile(
      path.join(OUTPUT_DIR, 'registry.json'),
      'utf-8',
    );
    const registryIndex = JSON.parse(registryIndexContent) as {
      items: {
        name: string;
        type: string;
        files: { path: string; type: string }[];
      }[];
    };

    const names = registryIndex.items.map((item) => item.name);
    const uniqueNames = new Set(names);
    expect(uniqueNames.size).toBe(names.length);

    const hasBlock = registryIndex.items.some(
      (item) => item.type === 'registry:block',
    );
    const hasExample = registryIndex.items.some(
      (item) => item.type === 'registry:example',
    );
    expect(hasBlock).toBe(true);
    expect(hasExample).toBe(true);

    const invalidFileType = registryIndex.items
      .flatMap((item) => item.files)
      .find((file) => !file.type.startsWith('registry:'));
    expect(invalidFileType).toBeUndefined();
  });
});
