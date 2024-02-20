'use client';

import { ContactType } from '@lib/hooks/contact';
import { ContactModule } from '@lib/types/contact';
import type { IUser } from '@lib/types/user';

import LinkSignup from '../Buttons/LinkSignup';
import ContactFormGeneralTemplate from '../Templates/ContactFormGeneralTemplate';

interface IFormProps {
  ip: string;
  user?: IUser;
}

const HelpAlert = () => {
  return (
    <>
      Permissions are REQUIRED on a user's account to create new tournaments.
      <br />
      <br />
      All league directors and managers{' '}
      <span className="font-semibold">MUST</span> have a Pickleball.com account.
      Don't have one?
      <br />
      <br />
      <LinkSignup />
      <br />
      <br />
      Fill out the form below and we will review your request.
      <br />
      Once you have permissions you can create as many leagues as you like.
    </>
  );
};

export default function LeagueCreateForm(props: IFormProps) {
  const extraPayload = {
    moduleFor: ContactModule.CLUB_SYSTEM_MODULE_TYPE
  };
  return (
    <ContactFormGeneralTemplate
      ip={props.ip}
      user={props.user}
      alertContent={<HelpAlert />}
      title="New League"
      subtitle="Complete the form below."
      contactType={ContactType.LeagueCreate}
      extraPayload={extraPayload}
    />
  );
}
