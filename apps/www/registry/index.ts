import { blockItems } from './registry-blocks';
import { exampleItems } from './registry-examples';
import { registryItems } from './registry-ui';

export const registry = {
  name: 'seaguntech/ui',
  homepage: 'https://ui.seaguntech.local',
  items: [...registryItems, ...blockItems, ...exampleItems],
};
