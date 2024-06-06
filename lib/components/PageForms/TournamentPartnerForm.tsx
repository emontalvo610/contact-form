'use client';

import { ContactType } from '@lib/hooks/contact';
import type { IAttendeeActivity } from '@lib/types/attendee-activity';
import type { IEventGroup } from '@lib/types/event-group';
import type { IUser } from '@lib/types/user';
import { getAllMixDoubleSkillOptions } from '@lib/utils/mixDoubleSkill';

import ContactFormGeneralTemplate from '../Templates/ContactFormGeneralTemplate';

interface IFormProps {
  ip: string;
  user?: IUser;
  attendeeActivity: IAttendeeActivity;
  eventGroup: IEventGroup;
}

const AdditionalNotes = () => {
  return (
    <>
      Please note, this is a request only. Submitting this form does not
      guarantee that you will be partnered. Both parties must agree and complete
      registration to confirm their partnership. It is not the responsibility of
      the tournament to facilitate the partnership.
    </>
  );
};

export default function TournamentPartnerForm(props: IFormProps) {
  const mixDoubleSkillOptions = getAllMixDoubleSkillOptions();
  const extraPayload = {
    eventUuid: props.attendeeActivity.ActivityID,
    userUuid: props.attendeeActivity.UserID
  };
  const skillLabel = `${props.eventGroup.PlayerGroupTitle} ${props.eventGroup.FormatTitle} Skill`;

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
      skillLabel={skillLabel}
      additionalNotes={<AdditionalNotes />}
    />
  );
}
