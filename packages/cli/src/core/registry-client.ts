import type { RegistriesIndex, RegistryIndex, RegistryItem } from '../types.js';
import {
  registriesIndexSchema,
  registryIndexSchema,
  registryItemSchema,
} from './schemas.js';

export async function fetchRegistryItem(baseUrl: string, name: string) {
  const url = buildRegistryItemUrl(baseUrl, name);
  const data = await fetchJson(url);
  return registryItemSchema.parse(data) as RegistryItem;
}

export async function fetchRegistryIndex(baseUrl: string) {
  const url = buildRegistryIndexUrl(baseUrl);
  const data = await fetchJson(url);
  return registryIndexSchema.parse(data) as RegistryIndex;
}

export async function fetchRegistriesIndex(baseUrl: string) {
  const url = buildRegistriesIndexUrl(baseUrl);
  const data = await fetchJson(url);
  return registriesIndexSchema.parse(data) as RegistriesIndex;
}

export function buildRegistryItemUrl(baseUrl: string, name: string) {
  return new URL(`/r/${name}.json`, ensureBaseUrl(baseUrl)).toString();
}

export function buildRegistryIndexUrl(baseUrl: string) {
  return new URL('/r/registry.json', ensureBaseUrl(baseUrl)).toString();
}

export function buildRegistriesIndexUrl(baseUrl: string) {
  return new URL('/r/registries.json', ensureBaseUrl(baseUrl)).toString();
}

export async function fetchJson(url: string) {
  const response = await fetch(url, {
    headers: {
      accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(
      `Request failed ${response.status} ${response.statusText}: ${url}`,
    );
  }

  return response.json();
}

function ensureBaseUrl(baseUrl: string) {
  const normalized = baseUrl.replace(/\/+$/, '');
  return `${normalized}/`;
}
