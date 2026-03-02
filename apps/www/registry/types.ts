export type RegistryFile = {
  path: string;
  type:
    | 'registry:ui'
    | 'registry:lib'
    | 'registry:file'
    | 'registry:component'
    | 'registry:page'
    | 'registry:example';
  target?: string;
};

export type RegistryItem = {
  name: string;
  type: 'registry:ui' | 'registry:lib' | 'registry:block' | 'registry:example';
  description: string;
  dependencies?: string[];
  registryDependencies?: string[];
  categories?: string[];
  meta?: {
    iframeHeight?: string;
    container?: string;
    mobile?: 'component' | 'full';
  };
  files: RegistryFile[];
};
