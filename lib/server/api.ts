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
    const { status, data } = await apiClient.post(
      `${Environment.API_URL}/v1/pb_data/json`,
      JSON.stringify({
        ClubGUID: uuid
      }),
      {
        params: {
          sp_name: 'API_v2_Club_GetDetails'
        }
      }
    );
    if (status === 200 && data.payload?.length > 0) {
      const clubData = data.payload[0];
      return clubData;
    }
  } catch (err) {
    console.error(`Error: LookupClubByUuid by ${uuid}`, err);
  }
  return null;
};

export const getLeague = async (uuid: string) => {
  try {
    if (!uuid) return null;
    const { status, data } = await apiClient.post(
      `${Environment.API_URL}/v1/pb_data/json`,
      {
        LeagueID: uuid
      },
      {
        params: {
          sp_name: 'API_v2_League_GetDetails'
        }
      }
    );
    if (status === 200 && data.payload?.length > 0) {
      const leagueData = data.payload[0];
      return leagueData;
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
