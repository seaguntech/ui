const FALLBACK_REGISTRY_URL = 'https://registry-seaguntech.vercel.app';

function trimTrailingSlashes(value: string) {
  return value.replace(/\/+$/, '');
}

export function getRegistryBaseUrl() {
  const rawUrl =
    process.env.REGISTRY_URL ??
    process.env.NEXT_PUBLIC_APP_URL ??
    FALLBACK_REGISTRY_URL;

  return trimTrailingSlashes(rawUrl);
}
