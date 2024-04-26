'use client';

import { ContactType } from '@lib/hooks/contact';
import { ContactModule } from '@lib/types/contact';
import type { IUser } from '@lib/types/user';
import { getContactReasonOptions } from '@lib/utils/reason';
import { useSearchParams } from 'next/navigation';

import ContactFormGeneralTemplate from '../Templates/ContactFormGeneralTemplate';

interface IFormProps {
  ip: string;
  user?: IUser;
}

const HelpAlert = () => {
  const searchParams = useSearchParams();
  const moduleName = searchParams?.get('module') ?? 'default';
  return (
    <>
      If you need to contact the tournament, league, or club you must go to
      their detail screen and click the link UNDER the logo that reads "
      <span className="font-bold">Contact Tourney</span>", "
      <span className="font-bold">Contact League</span>", or "
      <span className="font-bold">Contact Club</span>".
      <br />
      <br />
      This form is for contacting{' '}
      {moduleName === 'tourney'
        ? 'Pickleballtournaments.com'
        : 'Pickleball.com'}
      . We <strong>CANNOT</strong> answer any questions about a tournament,
      league, or club you are inquiring about.
    </>
  );
};

export default function PickleballContactForm(props: IFormProps) {
  const searchParams = useSearchParams();
  const moduleName = searchParams?.get('module') ?? 'default';
  const platform =
    moduleName === 'tourney' ? 'pickleballtournaments.com' : 'pickleball.com';
  const contactReasonOptions = getContactReasonOptions([
    'REGISTRATION_CONTACT_FORM_REASON',
    'MY_WEBSITE_ACCOUNT_CONTACT_FORM_REASON',
    'OTHER_CONTACT_FORM_REASON'
  ]);
  const extraPayload = {
    moduleFor: ContactModule.GLOBAL_SYSTEM_MODULE_TYPE,
    moduleUuid: '622dc379-f3ae-4eae-b993-e02948ae20ca' // random UUID v4
  };

  return (
    <ContactFormGeneralTemplate
      ip={props.ip}
      user={props.user}
      alertContent={<HelpAlert />}
      title="Contact us"
      platform={platform}
      subtitle="Complete the form below and we'll get back to you."
      contactReasonOptions={contactReasonOptions}
      contactType={ContactType.Pickleball}
      extraPayload={extraPayload}
    />
  );
}
