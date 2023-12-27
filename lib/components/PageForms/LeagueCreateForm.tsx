'use client';

import { ContactType } from '@lib/hooks/contact';
import ContactFormGeneralTemplate from '../Templates/ContactFormGeneralTemplate';

interface IFormProps {
  ip: string;
};

const HelpAlert = () => {
  return (
    <>
      Permissions are REQUIRED on a user's account to create new tournaments.
      <br /><br />
      All league directors and managers <span className='font-semibold'>MUST</span> have a Pickleball Brackets account. Don't have one?
      <br /><br />
      <a href='https://pickleballbrackets.com/lrfc_l.aspx'>Click here to sign up.</a>
      <br /><br />
      Fill out the form below and we will review your request.
      <br />
      Once you have permissions you can create as many leagues as you like.
    </>
  )
};

export default function LeagueCreateForm(props: IFormProps) {
  return (
    <ContactFormGeneralTemplate
      ip={props.ip}
      alertContent={<HelpAlert />}
      title="New League"
      subtitle="Complete the form below."
      contactReasonOptions={[]}
      contactType={ContactType.LeagueCreate}
    />
  )
}
