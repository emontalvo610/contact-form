import PickleballContactForm from '@lib/components/PageForms/PickleballContactForm';
import TournamentPartnerForm from '@lib/components/PageForms/TournamentPartnerForm';
import { getAttendeeActivity } from '@lib/server/api';
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
  console.log({ attendeeActivity });

  return attendeeActivity ? (
    <TournamentPartnerForm
      ip={ip}
      user={user}
      attendeeActivity={attendeeActivity}
    />
  ) : (
    <PickleballContactForm ip={ip} user={user} />
  );
}
