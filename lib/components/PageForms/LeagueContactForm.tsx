'use client';

import { ContactType } from '@lib/hooks/contact';
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
    'Registration',
    'Refunds',
    'Sponsors',
    'MyWebsiteAccount',
    'Other'
  ]);

  console.log('@League: ', props.league);

  return (
    <ContactFormGeneralTemplate
      ip={props.ip}
      user={props.user}
      title="4.0+ Mens Doubles"
      subtitle="Complete the form below and we'll get back to you."
      contactReasonOptions={contactReasonOptions}
      contactType={ContactType.League}
    />
  );
}
