import httpProxy from 'http-proxy';

import { Environment } from './environment';

export const proxy = httpProxy.createProxyServer({
  /**
   * Get the actual bac-end service url from env variables.
   * We shouldn't prefix the env variable with NEXT_PUBLIC_* to avoid exposing it to the client.
   */
  target: Environment.API_URL,
  changeOrigin: true
});
