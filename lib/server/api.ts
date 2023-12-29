import type { IClub } from '@lib/types/club';
import type { ILeague } from '@lib/types/league';
import type { ITournament } from '@lib/types/tournament';
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

export const getClub = async (uuid: string) => {
  try {
    if (!uuid) return null;
    const { status, data } = await apiClient.get(
      `${Environment.API_URL}/v1/data/clubs/${uuid}`
    );
    if (status === 200) {
      return data as IClub;
    }
  } catch (err) {
    console.error(`Error: LookupClubByUuid by ${uuid}`, err);
  }
  return null;
};

export const getLeague = async (uuid: string) => {
  try {
    if (!uuid) return null;
    const { status, data } = await apiClient.get(
      `${Environment.API_URL}/v1/data/leagues/${uuid}`
    );
    if (status === 200) {
      return data as ILeague;
    }
  } catch (err) {
    console.error(`Error: LookupLeagueByUuid by ${uuid}`, err);
  }
  return null;
};

export const getTournament = async (uuid: string) => {
  try {
    if (!uuid) return null;
    const { status, data } = await apiClient.get(
      `${Environment.API_URL}/v1/data/tourney_flat_data?tournament_uuid=${uuid}`
    );
    if (status === 200) {
      if (data.result?.length === 1) {
        return data.result[0] as ITournament;
      }
    }
  } catch (err) {
    console.error(`Error: LookupTournamentByUuid by ${uuid}`, err);
  }
  return null;
};

export const getAttendee = async (uuid: string) => {
  if (!uuid) console.log('Getting attendee...');
  return null;
};
