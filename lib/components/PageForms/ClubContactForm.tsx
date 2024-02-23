'use client';

import { ContactType } from '@lib/hooks/contact';
import type { IClub } from '@lib/types/club';
import { ContactModule } from '@lib/types/contact';
import type { IUser } from '@lib/types/user';
import { getContactReasonOptions } from '@lib/utils/reason';

import ContactFormGeneralTemplate from '../Templates/ContactFormGeneralTemplate';

interface IFormProps {
  ip: string;
  user?: IUser;
  club: IClub;
}

export default function ClubContactForm(props: IFormProps) {
  const contactReasonOptions = getContactReasonOptions([
    'REGISTRATION_CONTACT_FORM_REASON',
    'REFUNDS_CONTACT_FORM_REASON',
    'SPONSOR_CONTACT_FORM_REASON',
    'MY_WEBSITE_ACCOUNT_CONTACT_FORM_REASON',
    'OTHER_CONTACT_FORM_REASON'
  ]);

  const extraPayload = {
    moduleFor: ContactModule.CLUB_SYSTEM_MODULE_TYPE,
    moduleUuid: props.club.ClubGUID
  };

  return (
    <ContactFormGeneralTemplate
      ip={props.ip}
      user={props.user}
      title={props.club.Title}
      subtitle="Complete the form below and we'll get back to you."
      contactReasonOptions={contactReasonOptions}
      contactType={ContactType.Club}
      extraPayload={extraPayload}
    />
  );
}
