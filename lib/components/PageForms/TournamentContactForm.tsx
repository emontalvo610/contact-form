'use client';

import { ContactType } from '@lib/hooks/contact';
import type { IUser } from '@lib/types/user';
import { getContactReasonOptions } from '@lib/utils/reason';

import ContactFormGeneralTemplate from '../Templates/ContactFormGeneralTemplate';

interface IFormProps {
  ip: string;
  user?: IUser;
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
      title="Dink For Cause Holiday Charity Tournament Benefiting The New Way"
      subtitle="Complete the form below and we'll get back to you."
      contactReasonOptions={contactReasonOptions}
      contactType={ContactType.Tournament}
    />
  );
}
