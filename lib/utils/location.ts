/* eslint-disable no-console */
import axios from 'axios';
import type { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';

export const extractIP = (header: ReadonlyHeaders) => {
  const forwardAddr = (header.get('x-forwarded-for') ?? '127.0.0.1').split(
    ','
  )[0]; // ::ffff:127.0.0.1
  const reg = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
  const res = forwardAddr.match(reg);
  if (res) {
    return res[0];
  }
  return '';
};

export const getLocationFromIP = async (ip: string) => {
  try {
    if (!ip) {
      return null;
    }
    const { data } = await axios.get(`https://ipapi.co/${ip}/json`);
    return data;
  } catch (err) {
    console.error('Unable to get location from IP: ', ip);
    return null;
  }
};
