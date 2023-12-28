import type { IUser } from '@lib/types/user';

import apiClient from './axios';
import { Environment } from './environment';

export const getUser = async (uuid: string) => {
  try {
    const { status, data } = await apiClient.get(
      `${Environment.API_URL}/v1/users/${uuid}`
    );
    if (status === 200) {
      const { result: user } = data;
      return user as IUser;
    }
  } catch (err) {
    console.error(`Error: LookupUserByUuid by ${uuid}`, err);
  }
  return null;
};
