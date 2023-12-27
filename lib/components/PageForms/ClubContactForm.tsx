'use client';

import ContactFormGeneralTemplate from '../Templates/ContactFormGeneralTemplate';
import { getContactReasonOptions } from '@lib/utils/reason';

interface IFormProps {
  ip: string;
};

export default function ClubContactForm(props: IFormProps) {
  const contactReasonOptions = getContactReasonOptions(["Registration", "Refunds", "Sponsors", "MyWebsiteAccount", "Other"]);

  return (
    <ContactFormGeneralTemplate
      ip={props.ip}
      title="- Southern Pickleball Association"
      subtitle="Complete the form below and we'll get back to you."
      contactReasonOptions={contactReasonOptions}
    />
  )
}
