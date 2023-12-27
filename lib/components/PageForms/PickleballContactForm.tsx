'use client';

import ContactFormGeneralTemplate from '../Templates/ContactFormGeneralTemplate';
import { getContactReasonOptions } from '@lib/utils/reason';

interface IFormProps {
  ip: string;
};

const HelpAlert = () => {
  return (
    <>
      If you need to contact the tournament, league, or club you must go to their detail screen and click the link UNDER the logo that reads "<span className="font-bold">Contact Tourney</span>", "<span className="font-bold">Contact League</span>", or "<span className="font-bold">Contact Club</span>".
      <br /><br />
      This form is for contacting PickleballBrackets.com. We <strong>CANNOT</strong> answer any questions about a tournament, league, or club you are inquiring about.
    </>
  )
};

export default function PickleballContactForm(props: IFormProps) {
  const contactReasonOptions = getContactReasonOptions(["Registration", "MyWebsiteAccount", "Other"]);

  return (
    <ContactFormGeneralTemplate
      ip={props.ip}
      alertContent={<HelpAlert />}
      title="Contact us"
      subtitle="Complete the form below and we'll get back to you."
      contactReasonOptions={contactReasonOptions}
    />
  )
}
