import type { OrganizationType } from '@lib/types/organization';
import axios from 'axios';

export const getOrganizationTypes = async () => {
  const response = await axios.get<{
    results: { organization_types: OrganizationType[] };
  }>('/api/proxy/v2/data/organization_types?show_inactive=false');
  return response.data.results.organization_types;
};
