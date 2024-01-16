'use client';

import { ContactType } from '@lib/hooks/contact';
import type { IUser } from '@lib/types/user';
import { allClubTypes, getClubTypeOptions } from '@lib/utils/club';

import LinkSignup from '../Buttons/LinkSignup';
import ContactFormGeneralTemplate from '../Templates/ContactFormGeneralTemplate';

interface IFormProps {
  ip: string;
  user?: IUser;
}

const HelpAlert = () => {
  return (
    <>
      In Pickleball.com clubs are categorizes as a type of organization. An
      example of organization types are Association, Club, Company, Facility,
      Government Department, Not For Profit, and so on.
      <br />
      <br />
      All club managers <span className="font-semibold">MUST</span> have a
      Pickleball.com account. Don't have one?
      <br />
      <br />
      <LinkSignup />
      <br />
      <br />
      Clubs are created upon request. Once they're created all tournaments,
      leagues, members, club ratings, and clinics{' '}
      <span className="font-semibold">CAN BE</span> associated through that
      club.
      <br />
      <br />
      <span className="font-semibold">
        These should be created by the club organizer or manager.
      </span>
    </>
  );
};

export default function ClubCreateForm(props: IFormProps) {
  const clubTypeOptions = getClubTypeOptions(allClubTypes);
  return (
    <ContactFormGeneralTemplate
      ip={props.ip}
      user={props.user}
      alertContent={<HelpAlert />}
      title="New Club"
      subtitle="Complete the form below."
      shouldIncludeClub
      clubTypeOptions={clubTypeOptions}
      contactType={ContactType.ClubCreate}
    />
  );
}
