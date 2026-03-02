export type DocsNavItem = {
  title: string;
  href: string;
  isNew?: boolean;
};

export type DocsComponentNavItem = DocsNavItem & {
  name: string;
};

export const docsGettingStartedNavItems: DocsNavItem[] = [
  { title: 'Introduction', href: '/docs' },
  { title: 'Components', href: '/docs/components' },
  { title: 'Registry', href: '/docs/registry' },
];

export const docsComponentNavItems: DocsComponentNavItem[] = [
  { title: 'Badge', name: 'badge', href: '/docs/components/badge' },
  {
    title: 'Bento Grid',
    name: 'bento-grid',
    href: '/docs/components/bento-grid',
  },
  { title: 'Button', name: 'button', href: '/docs/components/button' },
  { title: 'Card', name: 'card', href: '/docs/components/card' },
  { title: 'Command', name: 'command', href: '/docs/components/command' },
  {
    title: 'Conversation',
    name: 'conversation',
    href: '/docs/components/conversation',
  },
  { title: 'Dialog', name: 'dialog', href: '/docs/components/dialog' },
  {
    title: 'Dropdown Menu',
    name: 'dropdown-menu',
    href: '/docs/components/dropdown-menu',
  },
  {
    title: 'Generative Container',
    name: 'generative-container',
    href: '/docs/components/generative-container',
    isNew: true,
  },
  { title: 'Input', name: 'input', href: '/docs/components/input' },
  { title: 'Label', name: 'label', href: '/docs/components/label' },
  {
    title: 'Magnetic Button',
    name: 'magnetic-button',
    href: '/docs/components/magnetic-button',
    isNew: true,
  },
  {
    title: 'Scroll Area',
    name: 'scroll-area',
    href: '/docs/components/scroll-area',
  },
  {
    title: 'Separator',
    name: 'separator',
    href: '/docs/components/separator',
  },
  {
    title: 'Spotlight Card',
    name: 'spotlight-card',
    href: '/docs/components/spotlight-card',
  },
  { title: 'Tabs', name: 'tabs', href: '/docs/components/tabs' },
  { title: 'Textarea', name: 'textarea', href: '/docs/components/textarea' },
  {
    title: 'Voice Button',
    name: 'voice-button',
    href: '/docs/components/voice-button',
  },
  {
    title: 'Voice Input Bar',
    name: 'voice-input-bar',
    href: '/docs/components/voice-input-bar',
    isNew: true,
  },
  { title: 'Waveform', name: 'waveform', href: '/docs/components/waveform' },
];

export const docsSidebarSections = [
  { title: 'Getting Started', items: docsGettingStartedNavItems },
  { title: 'Components', items: docsComponentNavItems },
] as const;

export function getComponentDocNeighbors(name: string) {
  const currentIndex = docsComponentNavItems.findIndex(
    (item) => item.name === name,
  );

  if (currentIndex < 0) {
    return {
      previous: null,
      next: null,
    };
  }

  return {
    previous: docsComponentNavItems[currentIndex - 1] ?? null,
    next: docsComponentNavItems[currentIndex + 1] ?? null,
  };
}

export function isDocsComponentNew(name: string) {
  return docsComponentNavItems.some((item) => item.name === name && item.isNew);
}
