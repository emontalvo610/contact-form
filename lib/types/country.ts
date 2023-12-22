export interface Country {
  id: string;
  abbreviation: string;
  title: string;
  internationalCountryCallingCode: string;
  stateTitle: string;
  zipCodeTitle: string;
  systemTextNumberId: string;
  abbreviation2Digit: string;
}

export interface State {
  id: string;
  abbreviation: string;
  title: string;
  countryId: string;
}
