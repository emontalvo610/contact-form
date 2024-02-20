export interface IClub {
  uuid: string;
  title: string;
  abbreviation: string;
  clubTypeId: string;
  countryId: string;
}

export interface ClubType {
  id: string;
  title: string;
  isEnabled: boolean;
}
