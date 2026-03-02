import { getRegistryBaseUrl } from '../lib/registry-url';
import { registry } from '../registry';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { registriesIndexSchema, registryItemSchema } from 'shadcn/schema';

const OUT_DIR = path.join(process.cwd(), 'public/r');
const SOURCE_DIR = path.join(process.cwd(), 'registry/seaguntech-ui');
const ITEM_SCHEMA = 'https://ui.shadcn.com/schema/registry-item.json';

type BuiltFile = {
  path: string;
  type: string;
  target?: string;
  content: string;
};

async function loadFileContent(relativePath: string) {
  const absolutePath = path.join(SOURCE_DIR, relativePath);
  return readFile(absolutePath, 'utf-8');
}

async function buildItemJson(item: (typeof registry.items)[number]) {
  const files: BuiltFile[] = await Promise.all(
    item.files.map(async (file) => ({
      path: file.path,
      type: file.type,
      target: file.target,
      content: await loadFileContent(file.path),
    })),
  );

  return {
    $schema: ITEM_SCHEMA,
    name: item.name,
    type: item.type,
    description: item.description,
    dependencies: item.dependencies ?? [],
    registryDependencies: item.registryDependencies ?? [],
    files,
  };
}

async function cleanOutputDir() {
  await rm(OUT_DIR, { recursive: true, force: true });
  await mkdir(OUT_DIR, { recursive: true });
}

export async function buildRegistry() {
  await cleanOutputDir();
  const baseUrl = getRegistryBaseUrl();

  const builtItems = await Promise.all(
    registry.items.map((item) => buildItemJson(item)),
  );

  for (const item of builtItems) {
    registryItemSchema.parse(item);
  }

  await Promise.all(
    builtItems.map(async (item) => {
      const outputPath = path.join(OUT_DIR, `${item.name}.json`);
      await writeFile(outputPath, JSON.stringify(item, null, 2));
    }),
  );

  const allJson = {
    $schema: ITEM_SCHEMA,
    name: 'all',
    type: 'registry:ui',
    description: 'All components from seaguntech/ui registry',
    dependencies: Array.from(
      new Set(builtItems.flatMap((item) => item.dependencies)),
    ).sort(),
    registryDependencies: Array.from(
      new Set(builtItems.flatMap((item) => item.registryDependencies)),
    ).sort(),
    files: builtItems.flatMap((item) => item.files),
  };

  await writeFile(
    path.join(OUT_DIR, 'all.json'),
    JSON.stringify(allJson, null, 2),
  );

  const registryJson = {
    name: registry.name,
    homepage: registry.homepage,
    items: builtItems.map(({ files, ...rest }) => ({
      ...rest,
      files: files.map((file) => ({
        path: file.path,
        type: file.type,
        target: file.target,
      })),
    })),
  };

  await writeFile(
    path.join(OUT_DIR, 'registry.json'),
    JSON.stringify(registryJson, null, 2),
  );

  const registriesJson = {
    '@seaguntech': `${baseUrl}/r/{name}.json`,
  };
  registriesIndexSchema.parse(registriesJson);
  await writeFile(
    path.join(OUT_DIR, 'registries.json'),
    JSON.stringify(registriesJson, null, 2),
  );

  process.stdout.write(`Built ${builtItems.length} registry items\n`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  buildRegistry().catch((error) => {
    process.stderr.write(
      `${error instanceof Error ? error.stack : String(error)}\n`,
    );
    process.exit(1);
  });
}
