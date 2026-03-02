import { blockItems } from '@/registry/registry-blocks';
import { exampleItems } from '@/registry/registry-examples';
import { registryItems } from '@/registry/registry-ui';

export function getRegistryItems() {
  return [...registryItems, ...blockItems, ...exampleItems];
}

export function getRegistryItem(name: string) {
  return getRegistryItems().find((item) => item.name === name);
}

export function getUiItems() {
  return registryItems;
}

export function getBlockItems() {
  return blockItems;
}

export function getExampleItems() {
  return exampleItems;
}
