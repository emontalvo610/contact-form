import { Country } from "@lib/types/country";
import axios from "axios";

export const getCountries = async () => {
  const response = await axios.get<{ results: Country[] }>(
    '/api/proxy/v1/data/lookup_countries'
  );
  return response.data;
};