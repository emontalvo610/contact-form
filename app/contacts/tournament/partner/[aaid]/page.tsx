import PickleballContactForm from '@lib/components/PageForms/PickleballContactForm';
import TournamentPartnerForm from '@lib/components/PageForms/TournamentPartnerForm';
import { getAttendeeActivity, getTourneyEventsGrouped } from '@lib/server/api';
import { getServerActionUser } from '@lib/server/session/session';
import { extractIP } from '@lib/utils/location';
import { headers } from 'next/headers';

interface IPageProps {
  params: {
    aaid: string;
  };
}

export default async function TournamentPartnerFormPage({
  params
}: IPageProps) {
  const ip = extractIP(headers());
  const user = await getServerActionUser();
  const attendeeActivity = await getAttendeeActivity(params.aaid);
  const eventGroup = await getTourneyEventsGrouped(
    attendeeActivity.EventID,
    attendeeActivity.ActivityID
  );

  return attendeeActivity ? (
    <TournamentPartnerForm
      ip={ip}
      user={user}
      attendeeActivity={attendeeActivity}
      eventGroup={eventGroup}
    />
  ) : (
    <PickleballContactForm ip={ip} user={user} />
  );
}
