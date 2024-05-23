export function removeTrailingSlash(url: string) {
  return url.replace(/\/$/, '');
}

export const proxyWhitelist = [
  '/v1/data/lookup_countries',
  '/v2/data/organization_types'
];

export function isValidProxyUrl(url?: string) {
  if (!url) return false;
  return proxyWhitelist.some(whiteUrl => url.includes(whiteUrl));
}
