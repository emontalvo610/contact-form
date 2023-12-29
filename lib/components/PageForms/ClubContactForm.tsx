'use client';

import { ContactType } from '@lib/hooks/contact';
import type { IClub } from '@lib/types/club';
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
    'Registration',
    'Refunds',
    'Sponsors',
    'MyWebsiteAccount',
    'Other'
  ]);

  console.log('@Club: ', props.club);

  return (
    <ContactFormGeneralTemplate
      ip={props.ip}
      user={props.user}
      title="- Southern Pickleball Association"
      subtitle="Complete the form below and we'll get back to you."
      contactReasonOptions={contactReasonOptions}
      contactType={ContactType.Club}
    />
  );
}
