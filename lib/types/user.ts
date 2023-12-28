export interface ISessionUser {
  email: string;
  isSuperAdmin: boolean;
  uuid: string;
  token: string;
  expiration: string;
  isCompleted: boolean;
  oltToken: string;
  pbUuid: string;
}

export interface IUser {
  id: string;
  uuid: string;
  firstName: string;
  lastName: string;
  country: string;
  email: string;
  phoneCountryId: string;
  phoneAreaCode: string;
  phone: string;
}
