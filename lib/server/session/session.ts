import 'server-only';

import type { IronSessionData } from 'iron-session';
import { cookies } from 'next/headers';

import {
  getIronSession,
  getServerActionIronSession,
  type IronSessionOptions
} from '.';

export const sessionOptions: IronSessionOptions = {
  password: process.env.COOKIE_SECRET as string,
  cookieName: 'iron-session/pickleball/sso',
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    domain: process.env.COOKIE_DOMAIN
  }
};

declare module 'iron-session' {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  interface IronSessionData {
    user?: {
      email: string;
      isSuperAdmin: boolean;
      uuid: string;
      token: string;
      expiration: string;
      isCompleted: boolean;
      oltToken: string;
      pbUuid: string;
    };
  }
}

const getSession = async (req: Request, res: Response) => {
  const session = await getIronSession<IronSessionData>(
    req,
    res,
    sessionOptions
  );
  return session;
};

const getServerActionSession = async () => {
  const session = await getServerActionIronSession<IronSessionData>(
    sessionOptions,
    cookies()
  );
  return session;
};

export { getServerActionSession, getSession };
