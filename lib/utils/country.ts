import { Country } from "@lib/types/country";
import axios from "axios";

export const getCountries = async () => {
  const response = await axios.get<{ results: Country[] }>(
    '/api/proxy/v1/data/lookup_countries'
  );
  const countries = response.data.results;
  countries.unshift(...countries.filter(item => item.abbreviation === 'CAN'));
  countries.unshift(...countries.filter(item => item.abbreviation === 'USA'));
  return response.data;
};