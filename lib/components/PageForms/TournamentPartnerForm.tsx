'use client';

import { ContactType } from '@lib/hooks/contact';
import type { IAttendeeActivity } from '@lib/types/attendee-activity';
import type { IUser } from '@lib/types/user';
import { getAllMixDoubleSkillOptions } from '@lib/utils/mixDoubleSkill';

import ContactFormGeneralTemplate from '../Templates/ContactFormGeneralTemplate';

interface IFormProps {
  ip: string;
  user?: IUser;
  attendeeActivity: IAttendeeActivity;
}
export default function TournamentPartnerForm(props: IFormProps) {
  const mixDoubleSkillOptions = getAllMixDoubleSkillOptions();
  const extraPayload = {
    eventUuid: props.attendeeActivity.AttendeeActivityID,
    userUuid: props.attendeeActivity.UserID
  };

  return (
    <ContactFormGeneralTemplate
      ip={props.ip}
      user={props.user}
      title="Contact a player to partner with"
      subtitle={[
        props.attendeeActivity.Tournament_Title,
        props.attendeeActivity.Event_Title,
        `${props.attendeeActivity.LastName}, ${props.attendeeActivity.FirstName}`
      ]}
      mixDoubleSkillOptions={mixDoubleSkillOptions}
      contactType={ContactType.TournamentPartner}
      extraPayload={extraPayload}
    />
  );
}
