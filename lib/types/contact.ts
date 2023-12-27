import { ContactReasonType } from "@lib/utils/reason";

export interface IContactRequest {
  email: string;
  firstName: string;
  lastName: string;
  phoneCountryId: string;
  phoneNumber: string;
  contactReason: ContactReasonType;
  description: string;
  clubName?: string;
  clubType?: string;
  venuName?: string;
  venuAddress?: string;
  mixDoubleSkill?: string;
};