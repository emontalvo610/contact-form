/* eslint-disable no-console */
import axios from '@lib/server/axios';
import { Environment } from '@lib/server/environment';
import { validateRecaptchaToken } from '@lib/server/recaptcha';
import { removeTrailingSlash } from '@lib/utils/url';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    console.log('Unsupported method');
    res.status(405).json({ message: 'Method not supported' });
  }
  try {
    // removes the api prefix from url
    const endUrl = req.url?.replace(/^\/api\/contact/, '');
    const contactUrl = removeTrailingSlash(`${endUrl}`);

    // Recaptcha validation
    const captchaToken = req.body.captchaToken;
    const isHuman = await validateRecaptchaToken(captchaToken);
    if (!isHuman) {
      return res.status(500).json({
        message:
          'We were unable to verify that you are not a robot. Please ensure your browser has cookies and JavaScript enabled.'
      });
    }
    delete req.body.captchaToken;

    const response = await axios.post(
      `${Environment.API_URL}${contactUrl}`,
      req.body,
      {
        headers: {
          'PB-API-TOKEN': Environment.API_KEY
        }
      }
    );
    if (![200, 202].includes(response.status)) {
      throw new Error('API call failed');
    }
    return res.status(200).json(response.data);
  } catch (err) {
    return res.status(500).json({
      message: 'Something went wrong. Please try again some time later.'
    });
  }
};

export default handler;
