export enum ContactModule {
  UNDEFINED_SYSTEM_MODULE_TYPE = 'UNDEFINED_SYSTEM_MODULE_TYPE',
  TOURNAMENT_SYSTEM_MODULE_TYPE = 'TOURNAMENT_SYSTEM_MODULE_TYPE',
  CLUB_SYSTEM_MODULE_TYPE = 'ORGANIZATION_SYSTEM_MODULE_TYPE',
  LEAGUE_SYSTEM_MODULE_TYPE = 'LEAGUE_SYSTEM_MODULE_TYPE',
  GLOBAL_SYSTEM_MODULE_TYPE = 'GLOBAL_SYSTEM_MODULE_TYPE'
}

export interface IContactBase {
  email: string;
  firstName: string;
  lastName: string;
  phoneCountryId: string;
  phone: string;
  description: string;
  contactReason?: string;
  captchaToken: string;
}

export interface IContactRequest extends IContactBase {
  moduleUuid: string;
  moduleFor: ContactModule;
  contactReason: string;
}

export interface IContactCreateRequest extends IContactBase {
  moduleFor: ContactModule;
  organizationName?: string;
  organizationType?: string;
  venueName?: string;
  venueAddress?: string;
}

export interface IContactPartnerRequest extends IContactBase {
  userUuid: string;
  eventUuid: string;
  skill: string;
}

export type IContactAnyRequest = IContactRequest &
  IContactCreateRequest &
  IContactPartnerRequest;
