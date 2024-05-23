import { Environment } from '@lib/server/environment';
import { isValidProxyUrl, removeTrailingSlash } from '@lib/utils/url';
import { proxy } from '@server/proxy';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise((resolve, reject) => {
    // removes the api prefix from url
    const endUrl = req.url?.replace(/^\/api\/proxy/, '');
    // Check URL whitelisting
    if (!isValidProxyUrl(endUrl)) {
      reject(Error('Unauthorized attempt to the admin API'));
      return;
    }
    req.url = removeTrailingSlash(`${endUrl}`);
    req.headers['PB-API-TOKEN'] = Environment.API_KEY;
    /**
     * if an error occurs in the proxy, we will reject the promise.
     * it is so important. if you don't reject the promise,
     * you're facing the stalled requests issue.
     */
    proxy.once('error', reject);

    proxy.web(req, res);
  });
};

export default handler;

export const config = {
  api: {
    bodyParser: false
  }
};
