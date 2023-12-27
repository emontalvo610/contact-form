'use client';

import { allClubTypes, getClubTypeOptions } from '@lib/utils/club';
import ContactFormGeneralTemplate from '../Templates/ContactFormGeneralTemplate';
import { ContactType } from '@lib/hooks/contact';

interface IFormProps {
  ip: string;
}

const HelpAlert = () => {
  return (
    <>
      In Pickleball Brackets clubs are categorizes as a type of organization.
      Organization types can be an Association, Club, Company, Facility,
      Government Department, or Not For Profit.
      <br /><br />
      All club managers <span className='font-semibold'>MUST</span> have a
      Pickleball Brackets account. Don't have one?
      <br /><br />
      <a href='https://pickleballbrackets.com/lrfc_l.aspx'>Click here to sign up.</a>
      <br /><br />
      These are created upon request. Once they're created all tournaments, leagues,
      members, club ratings, and clinics <span className='font-semibold'>CAN BE</span> associated through that club.
      <br /><br />
      <span className='font-semibold'>These should be created by the club organizer or manager.</span>
    </>
  );
};

export default function ClubCreateForm(props: IFormProps) {
  const clubTypeOptions = getClubTypeOptions(allClubTypes);
  return (
    <ContactFormGeneralTemplate
      ip={props.ip}
      alertContent={<HelpAlert />}
      title="New Club"
      subtitle="Complete the form below."
      shouldIncludeClub={true}
      clubTypeOptions={clubTypeOptions}
      contactType={ContactType.ClubCreate}
    />
  );
}
