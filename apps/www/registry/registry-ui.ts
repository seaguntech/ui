import type { RegistryItem } from './types';

export const registryItems: RegistryItem[] = [
  {
    name: 'utils',
    type: 'registry:lib',
    description: 'Class name utility helpers',
    dependencies: ['clsx', 'tailwind-merge'],
    files: [
      {
        path: 'lib/utils.ts',
        type: 'registry:lib',
        target: 'lib/utils.ts',
      },
    ],
  },
  {
    name: 'button',
    type: 'registry:ui',
    description: 'Button component with variants',
    dependencies: ['@radix-ui/react-slot', 'class-variance-authority'],
    registryDependencies: ['utils'],
    files: [
      {
        path: 'ui/button.tsx',
        type: 'registry:ui',
        target: 'components/ui/button.tsx',
      },
    ],
  },
  {
    name: 'input',
    type: 'registry:ui',
    description: 'Text input with error state support',
    registryDependencies: ['utils'],
    files: [
      {
        path: 'ui/input.tsx',
        type: 'registry:ui',
        target: 'components/ui/input.tsx',
      },
    ],
  },
  {
    name: 'label',
    type: 'registry:ui',
    description: 'Accessible form label primitive',
    dependencies: ['@radix-ui/react-label'],
    registryDependencies: ['utils'],
    files: [
      {
        path: 'ui/label.tsx',
        type: 'registry:ui',
        target: 'components/ui/label.tsx',
      },
    ],
  },
  {
    name: 'card',
    type: 'registry:ui',
    description: 'Card surface primitives',
    registryDependencies: ['utils'],
    files: [
      {
        path: 'ui/card.tsx',
        type: 'registry:ui',
        target: 'components/ui/card.tsx',
      },
    ],
  },
  {
    name: 'badge',
    type: 'registry:ui',
    description: 'Badge labels for statuses and categories',
    dependencies: ['class-variance-authority'],
    registryDependencies: ['utils'],
    files: [
      {
        path: 'ui/badge.tsx',
        type: 'registry:ui',
        target: 'components/ui/badge.tsx',
      },
    ],
  },
  {
    name: 'separator',
    type: 'registry:ui',
    description: 'Visual separator primitive',
    dependencies: ['@radix-ui/react-separator'],
    registryDependencies: ['utils'],
    files: [
      {
        path: 'ui/separator.tsx',
        type: 'registry:ui',
        target: 'components/ui/separator.tsx',
      },
    ],
  },
  {
    name: 'textarea',
    type: 'registry:ui',
    description: 'Textarea primitive',
    registryDependencies: ['utils'],
    files: [
      {
        path: 'ui/textarea.tsx',
        type: 'registry:ui',
        target: 'components/ui/textarea.tsx',
      },
    ],
  },
  {
    name: 'voice-button',
    type: 'registry:ui',
    description: 'Voice interaction trigger button',
    dependencies: ['lucide-react'],
    registryDependencies: ['button', 'utils'],
    files: [
      {
        path: 'ui/voice-button.tsx',
        type: 'registry:ui',
        target: 'components/ui/voice-button.tsx',
      },
    ],
  },
  {
    name: 'waveform',
    type: 'registry:ui',
    description: 'Simple waveform visualization',
    registryDependencies: ['utils'],
    files: [
      {
        path: 'ui/waveform.tsx',
        type: 'registry:ui',
        target: 'components/ui/waveform.tsx',
      },
    ],
  },
  {
    name: 'conversation',
    type: 'registry:ui',
    description: 'Conversation and message primitives',
    registryDependencies: ['utils'],
    files: [
      {
        path: 'ui/conversation.tsx',
        type: 'registry:ui',
        target: 'components/ui/conversation.tsx',
      },
    ],
  },
  {
    name: 'tabs',
    type: 'registry:ui',
    description: 'Tabs primitives for segmented content',
    dependencies: ['@radix-ui/react-tabs'],
    registryDependencies: ['utils'],
    files: [
      {
        path: 'ui/tabs.tsx',
        type: 'registry:ui',
        target: 'components/ui/tabs.tsx',
      },
    ],
  },
  {
    name: 'dialog',
    type: 'registry:ui',
    description: 'Modal dialog primitives',
    dependencies: ['@radix-ui/react-dialog', 'lucide-react'],
    registryDependencies: ['utils'],
    files: [
      {
        path: 'ui/dialog.tsx',
        type: 'registry:ui',
        target: 'components/ui/dialog.tsx',
      },
    ],
  },
  {
    name: 'dropdown-menu',
    type: 'registry:ui',
    description: 'Dropdown menu primitives',
    dependencies: ['@radix-ui/react-dropdown-menu'],
    registryDependencies: ['utils'],
    files: [
      {
        path: 'ui/dropdown-menu.tsx',
        type: 'registry:ui',
        target: 'components/ui/dropdown-menu.tsx',
      },
    ],
  },
  {
    name: 'spotlight-card',
    type: 'registry:ui',
    description: 'A card component with spotlight mouse tracking effect',
    registryDependencies: ['utils'],
    files: [
      {
        path: 'ui/spotlight-card.tsx',
        type: 'registry:ui',
        target: 'components/ui/spotlight-card.tsx',
      },
    ],
  },
  {
    name: 'generative-container',
    type: 'registry:ui',
    description:
      'Container with an animated border glow to indicate AI generation',
    registryDependencies: ['utils'],
    files: [
      {
        path: 'ui/generative-container.tsx',
        type: 'registry:ui',
        target: 'components/ui/generative-container.tsx',
      },
    ],
  },
  {
    name: 'magnetic-button',
    type: 'registry:ui',
    description: 'Button that tracks mouse position with a magnetic effect',
    dependencies: ['framer-motion'],
    registryDependencies: ['button'],
    files: [
      {
        path: 'ui/magnetic-button.tsx',
        type: 'registry:ui',
        target: 'components/ui/magnetic-button.tsx',
      },
    ],
  },
  {
    name: 'voice-input-bar',
    type: 'registry:ui',
    description: 'Interactive voice input bar with waveform animation',
    dependencies: ['framer-motion', 'lucide-react'],
    registryDependencies: ['utils'],
    files: [
      {
        path: 'ui/voice-input-bar.tsx',
        type: 'registry:ui',
        target: 'components/ui/voice-input-bar.tsx',
      },
    ],
  },
  {
    name: 'bento-grid',
    type: 'registry:ui',
    description: 'Bento grid layout for showing features',
    registryDependencies: ['utils'],
    files: [
      {
        path: 'ui/bento-grid.tsx',
        type: 'registry:ui',
        target: 'components/ui/bento-grid.tsx',
      },
    ],
  },
  {
    name: 'command',
    type: 'registry:ui',
    description: 'Command popup and combo box primitive',
    dependencies: ['cmdk', 'lucide-react'],
    registryDependencies: ['dialog', 'utils'],
    files: [
      {
        path: 'ui/command.tsx',
        type: 'registry:ui',
        target: 'components/ui/command.tsx',
      },
    ],
  },
  {
    name: 'scroll-area',
    type: 'registry:ui',
    description: 'Scroll area primitive',
    dependencies: ['@radix-ui/react-scroll-area'],
    registryDependencies: ['utils'],
    files: [
      {
        path: 'ui/scroll-area.tsx',
        type: 'registry:ui',
        target: 'components/ui/scroll-area.tsx',
      },
    ],
  },
];
