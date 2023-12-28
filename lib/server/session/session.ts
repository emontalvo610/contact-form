import 'server-only';

import type { ISessionUser } from '@lib/types/user';
import type { IronSessionData } from 'iron-session';
import { cookies } from 'next/headers';

import { getUser } from '../api';
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
    user?: ISessionUser;
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

const getServerActionUser = async () => {
  const session = await getServerActionSession();
  const uuid = session?.user?.uuid;
  if (uuid) {
    const user = await getUser(uuid);
    return user || undefined;
  }
  return undefined;
};

export { getServerActionSession, getServerActionUser, getSession };
