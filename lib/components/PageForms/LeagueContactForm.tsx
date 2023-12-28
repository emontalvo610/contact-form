'use client';

import { ContactType } from '@lib/hooks/contact';
import type { IUser } from '@lib/types/user';
import { getContactReasonOptions } from '@lib/utils/reason';

import ContactFormGeneralTemplate from '../Templates/ContactFormGeneralTemplate';

interface IFormProps {
  ip: string;
  user?: IUser;
}

export default function LeagueContactForm(props: IFormProps) {
  const contactReasonOptions = getContactReasonOptions([
    'Registration',
    'Refunds',
    'Sponsors',
    'MyWebsiteAccount',
    'Other'
  ]);

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
