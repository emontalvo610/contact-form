'use client';

import { ContactType } from '@lib/hooks/contact';
import { ContactModule } from '@lib/types/contact';
import type { ILeague } from '@lib/types/league';
import type { IUser } from '@lib/types/user';
import { getContactReasonOptions } from '@lib/utils/reason';

import ContactFormGeneralTemplate from '../Templates/ContactFormGeneralTemplate';

interface IFormProps {
  ip: string;
  user?: IUser;
  league: ILeague;
}

export default function LeagueContactForm(props: IFormProps) {
  const contactReasonOptions = getContactReasonOptions([
    'REGISTRATION_CONTACT_FORM_REASON',
    'REFUNDS_CONTACT_FORM_REASON',
    'MY_WEBSITE_ACCOUNT_CONTACT_FORM_REASON',
    'OTHER_CONTACT_FORM_REASON'
  ]);

  const extraPayload = {
    moduleFor: ContactModule.LEAGUE_SYSTEM_MODULE_TYPE,
    moduleUuid: props.league.LeagueID
  };

  return (
    <ContactFormGeneralTemplate
      ip={props.ip}
      user={props.user}
      title={props.league.ClubTitle}
      subtitle="Complete the form below and we'll get back to you."
      contactReasonOptions={contactReasonOptions}
      contactType={ContactType.League}
      extraPayload={extraPayload}
    />
  );
}
