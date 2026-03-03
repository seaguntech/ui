import { writeRegistryFiles } from '../src/core/file-writer.js';
import { mkdir, mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';

const tempDirs: string[] = [];

afterEach(async () => {
  const { rm } = await import('node:fs/promises');
  await Promise.all(
    tempDirs.map((dir) => rm(dir, { recursive: true, force: true })),
  );
  tempDirs.length = 0;
});

describe('writeRegistryFiles', () => {
  it('writes new files', async () => {
    const cwd = await mkdtemp(path.join(tmpdir(), 'seagun-cli-'));
    tempDirs.push(cwd);

    const result = await writeRegistryFiles({
      cwd,
      files: [
        {
          path: 'ui/button.tsx',
          target: 'components/ui/button.tsx',
          type: 'registry:ui',
          content: 'export const Button = () => null;\n',
        },
      ],
      policy: 'fail',
    });

    expect(result.written).toEqual(['components/ui/button.tsx']);
    const file = await readFile(
      path.join(cwd, 'components/ui/button.tsx'),
      'utf-8',
    );
    expect(file).toContain('Button');
  });

  it('throws on conflict when policy is fail', async () => {
    const cwd = await mkdtemp(path.join(tmpdir(), 'seagun-cli-'));
    tempDirs.push(cwd);
    const targetPath = path.join(cwd, 'components/ui/button.tsx');
    await mkdir(path.dirname(targetPath), { recursive: true });
    await writeFile(targetPath, 'old', 'utf-8');

    await expect(
      writeRegistryFiles({
        cwd,
        files: [
          {
            path: 'ui/button.tsx',
            target: 'components/ui/button.tsx',
            type: 'registry:ui',
            content: 'new',
          },
        ],
        policy: 'fail',
      }),
    ).rejects.toThrow('File already exists');
  });
});
