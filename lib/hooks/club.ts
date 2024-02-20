import { getClubTypes } from '@lib/utils/club';
import { useQuery } from '@tanstack/react-query';

export const useGetClubTypes = () => {
  return useQuery({
    queryKey: ['club_types_lookup_data'],
    queryFn: getClubTypes,
    initialData: { results: [] }
  });
};
