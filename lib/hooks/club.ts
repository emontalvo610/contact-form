import { getOrganizationTypes } from '@lib/utils/club';
import { useQuery } from '@tanstack/react-query';

export const useGetOrganizationTypes = () => {
  return useQuery({
    queryKey: ['organization_types_lookup_data'],
    queryFn: getOrganizationTypes,
    initialData: []
  });
};
