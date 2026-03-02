import type { RegistryItem } from './types';

export const exampleItems: RegistryItem[] = [
  {
    name: 'dialog-demo',
    type: 'registry:example',
    description: 'Simple confirmation dialog example',
    registryDependencies: ['dialog', 'button'],
    files: [
      {
        path: 'examples/dialog-demo.tsx',
        type: 'registry:example',
      },
    ],
  },
  {
    name: 'voice-button-demo',
    type: 'registry:example',
    description: 'Voice button with local listening state',
    registryDependencies: ['voice-button'],
    files: [
      {
        path: 'examples/voice-button-demo.tsx',
        type: 'registry:example',
      },
    ],
  },
  {
    name: 'tabs-demo',
    type: 'registry:example',
    description: 'Tabs layout for segmented content',
    registryDependencies: ['tabs', 'card'],
    files: [
      {
        path: 'examples/tabs-demo.tsx',
        type: 'registry:example',
      },
    ],
  },
];
