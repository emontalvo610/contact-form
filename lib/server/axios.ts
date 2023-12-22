import axios from 'axios';

import { Environment } from './environment';

const apiClient = axios.create();

apiClient.interceptors.request.use(config => {
  config.headers['PB-API-TOKEN'] = Environment.API_KEY;
  return config;
});

export default apiClient;
