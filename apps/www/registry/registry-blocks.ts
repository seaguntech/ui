import type { RegistryItem } from './types';

export const blockItems: RegistryItem[] = [
  {
    name: 'voice-assistant-01',
    type: 'registry:block',
    description: 'Voice assistant shell with waveform and conversation panel',
    registryDependencies: [
      'voice-button',
      'waveform',
      'conversation',
      'card',
      'button',
    ],
    files: [
      {
        path: 'blocks/voice-assistant-01/page.tsx',
        type: 'registry:page',
        target: 'app/voice-assistant/page.tsx',
      },
      {
        path: 'blocks/voice-assistant-01/components/assistant-panel.tsx',
        type: 'registry:component',
        target: 'components/assistant-panel.tsx',
      },
    ],
    categories: ['voice', 'assistant'],
    meta: {
      iframeHeight: '760px',
      container: 'w-full min-h-svh flex items-center justify-center p-4',
      mobile: 'component',
    },
  },
  {
    name: 'workspace-quick-actions-01',
    type: 'registry:block',
    description: 'Workspace quick action board with tabs, dialogs, and menus',
    registryDependencies: [
      'tabs',
      'dialog',
      'dropdown-menu',
      'card',
      'badge',
      'button',
    ],
    files: [
      {
        path: 'blocks/workspace-quick-actions-01/page.tsx',
        type: 'registry:page',
        target: 'app/workspace/page.tsx',
      },
    ],
    categories: ['workspace', 'dashboard'],
    meta: {
      iframeHeight: '680px',
      container: 'w-full min-h-svh flex items-center justify-center p-4',
      mobile: 'component',
    },
  },
];
