'use client';

import { ContactType } from '@lib/hooks/contact';
import { ContactModule } from '@lib/types/contact';
import type { ITournament } from '@lib/types/tournament';
import type { IUser } from '@lib/types/user';
import { getContactReasonOptions } from '@lib/utils/reason';

import ContactFormGeneralTemplate from '../Templates/ContactFormGeneralTemplate';

interface IFormProps {
  ip: string;
  user?: IUser;
  tournament: ITournament;
}

export default function TournamentConactForm(props: IFormProps) {
  const contactReasonOptions = getContactReasonOptions([
    'REGISTRATION_CONTACT_FORM_REASON',
    'REFEREE_CONTACT_FORM_REASON',
    'REFUNDS_CONTACT_FORM_REASON',
    'REQUEST_PARTNER_CHANGE_CONTACT_FORM_REASON',
    'SPONSOR_CONTACT_FORM_REASON',
    'VENDOR_CONTACT_FORM_REASON',
    'VOLUNTEER_CONTACT_FORM_REASON',
    'MY_WEBSITE_ACCOUNT_CONTACT_FORM_REASON',
    'OTHER_CONTACT_FORM_REASON'
  ]);
  const extraPayload = {
    moduleFor: ContactModule.TOURNAMENT_SYSTEM_MODULE_TYPE,
    moduleUuid: props.tournament.TournamentID
  };

  return (
    <ContactFormGeneralTemplate
      ip={props.ip}
      user={props.user}
      title={props.tournament.Title}
      subtitle="Complete the form below and we'll get back to you."
      contactReasonOptions={contactReasonOptions}
      contactType={ContactType.Tournament}
      extraPayload={extraPayload}
    />
  );
}
