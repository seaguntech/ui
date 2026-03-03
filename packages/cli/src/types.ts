export type RegistryBuiltFile = {
  path: string;
  type: string;
  target?: string;
  content: string;
};

export type RegistryItem = {
  $schema?: string;
  name: string;
  type: string;
  description?: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: RegistryBuiltFile[];
};

export type RegistryIndex = {
  name: string;
  homepage?: string;
  items: Array<{
    name: string;
    type: string;
    description?: string;
    dependencies?: string[];
    registryDependencies?: string[];
    files: Array<{
      path: string;
      type: string;
      target?: string;
    }>;
  }>;
};

export type RegistriesIndex = Record<string, string>;

export type SeagunConfig = {
  registry: string;
};

export type PackageManager = 'pnpm' | 'npm' | 'yarn' | 'bun';
