import type { ClubType } from '@lib/types/club';
import axios from 'axios';

export const getClubTypes = async () => {
  const response = await axios.get<{ results: ClubType[] }>(
    '/api/proxy/v1/data/lookup_club_types'
  );
  return response.data;
};
