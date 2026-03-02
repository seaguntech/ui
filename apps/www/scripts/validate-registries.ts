import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { registriesIndexSchema, registryItemSchema } from 'shadcn/schema';

const OUTPUT_DIR = path.join(process.cwd(), 'public/r');

export async function validateRegistryOutputs() {
  const entries = await readdir(OUTPUT_DIR);
  const itemFiles = entries.filter(
    (name) =>
      name.endsWith('.json') &&
      !['registry.json', 'registries.json'].includes(name),
  );

  for (const filename of itemFiles) {
    const content = await readFile(path.join(OUTPUT_DIR, filename), 'utf-8');
    const data = JSON.parse(content);
    registryItemSchema.parse(data);
  }

  const registriesContent = await readFile(
    path.join(OUTPUT_DIR, 'registries.json'),
    'utf-8',
  );
  registriesIndexSchema.parse(JSON.parse(registriesContent));

  process.stdout.write(`Validated ${itemFiles.length} registry JSON files\n`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  validateRegistryOutputs().catch((error) => {
    process.stderr.write(
      `${error instanceof Error ? error.stack : String(error)}\n`,
    );
    process.exit(1);
  });
}
