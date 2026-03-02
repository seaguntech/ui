import { getRegistryItem } from '@/lib/registry';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export async function getRegistrySource(name: string) {
  const item = getRegistryItem(name);

  if (!item) {
    return [];
  }

  const baseDir = path.join(process.cwd(), 'registry/seaguntech-ui');

  const files = await Promise.all(
    item.files.map(async (file) => {
      const filePath = path.join(baseDir, file.path);
      const content = await readFile(filePath, 'utf-8');

      return {
        path: file.path,
        content,
      };
    }),
  );

  return files;
}
