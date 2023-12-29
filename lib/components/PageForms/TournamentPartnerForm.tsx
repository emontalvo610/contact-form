'use client';

import { ContactType } from '@lib/hooks/contact';
import type { IAttendee } from '@lib/types/attendee';
import type { IUser } from '@lib/types/user';
import { getAllMixDoubleSkillOptions } from '@lib/utils/mixDoubleSkill';

import ContactFormGeneralTemplate from '../Templates/ContactFormGeneralTemplate';

interface IFormProps {
  ip: string;
  user?: IUser;
  attendee: IAttendee;
}
export default function TournamentPartnerForm(props: IFormProps) {
  const mixDoubleSkillOptions = getAllMixDoubleSkillOptions();

  console.log('@Attendee: ', props.attendee);

  return (
    <ContactFormGeneralTemplate
      ip={props.ip}
      user={props.user}
      title="Contact a player to partner with"
      subtitle=""
      mixDoubleSkillOptions={mixDoubleSkillOptions}
      contactType={ContactType.TournamentPartner}
    />
  );
}
