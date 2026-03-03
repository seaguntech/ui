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

  it('writes into src when project alias points to src', async () => {
    const cwd = await mkdtemp(path.join(tmpdir(), 'seagun-cli-'));
    tempDirs.push(cwd);

    await mkdir(path.join(cwd, 'src'), { recursive: true });
    await writeFile(
      path.join(cwd, 'tsconfig.json'),
      JSON.stringify(
        {
          compilerOptions: {
            paths: {
              '@/*': ['./src/*'],
            },
          },
        },
        null,
        2,
      ),
      'utf-8',
    );

    const result = await writeRegistryFiles({
      cwd,
      files: [
        {
          path: 'ui/badge.tsx',
          target: 'components/ui/badge.tsx',
          type: 'registry:ui',
          content: 'export const Badge = () => null;\n',
        },
      ],
      policy: 'fail',
    });

    expect(result.written).toEqual(['src/components/ui/badge.tsx']);
    const exists = await readFile(
      path.join(cwd, 'src/components/ui/badge.tsx'),
      'utf-8',
    );
    expect(exists).toContain('Badge');
  });
});
