export const componentCatalog = [
  {
    title: 'Core',
    items: [
      'button',
      'input',
      'label',
      'card',
      'badge',
      'separator',
      'textarea',
    ],
  },
  {
    title: 'Interactive',
    items: ['tabs', 'dialog', 'dropdown-menu', 'command', 'scroll-area'],
  },
  {
    title: 'Voice and AI',
    items: [
      'voice-button',
      'waveform',
      'conversation',
      'generative-container',
      'voice-input-bar',
    ],
  },
  {
    title: 'Fancy UI & Micro-interactions',
    items: ['spotlight-card', 'magnetic-button', 'bento-grid'],
  },
] as const;

export function findComponentGroup(name: string) {
  return componentCatalog.find((group) => group.items.includes(name as never))
    ?.title;
}
