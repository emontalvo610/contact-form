import { getCountries } from '@lib/utils/country';
import { useQuery } from '@tanstack/react-query';

export const useGetCountries = () => {
  return useQuery({
    queryKey: ['countries_lookup_data'],
    queryFn: getCountries,
    initialData: { results: [] }
  });
};