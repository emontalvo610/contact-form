'use client';

import { ContactType } from '@lib/hooks/contact';
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
    'Registration',
    'Referees',
    'Refunds',
    'RequestPartnerChange',
    'Sponsors',
    'Vendors',
    'Volunteers',
    'MyWebsiteAccount',
    'Other'
  ]);

  return (
    <ContactFormGeneralTemplate
      ip={props.ip}
      user={props.user}
      title={props.tournament.Title}
      subtitle="Complete the form below and we'll get back to you."
      contactReasonOptions={contactReasonOptions}
      contactType={ContactType.Tournament}
    />
  );
}
