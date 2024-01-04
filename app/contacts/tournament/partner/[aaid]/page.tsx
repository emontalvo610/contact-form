import PickleballContactForm from '@lib/components/PageForms/PickleballContactForm';
import TournamentPartnerForm from '@lib/components/PageForms/TournamentPartnerForm';
import { getAttendee } from '@lib/server/api';
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
  const attendee = await getAttendee(params.aaid);

  return attendee ? (
    <TournamentPartnerForm ip={ip} user={user} attendee={attendee} />
  ) : (
    <PickleballContactForm ip={ip} user={user} />
  );
}
