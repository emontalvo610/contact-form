export interface ILocation {
  ip: string;
  error?: boolean;
  network: string;
  version: string;
  city: string;
  region: string;
  region_code: string;
  country: string;
  country_name: string;
  country_code: string;
  country_code_iso3: string;
  latitude: number;
  longitude: number;
  postal: string;
}