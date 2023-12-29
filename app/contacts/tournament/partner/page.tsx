import PickleballContactForm from '@lib/components/PageForms/PickleballContactForm';
import TournamentPartnerForm from '@lib/components/PageForms/TournamentPartnerForm';
import { getAttendee } from '@lib/server/api';
import { getServerActionUser } from '@lib/server/session/session';
import { extractIP } from '@lib/utils/location';
import { headers } from 'next/headers';

interface IPageProps {
  searchParams: {
    aaid: string;
  };
}

export default async function TournamentPartnerFormPage({
  searchParams
}: IPageProps) {
  const ip = extractIP(headers());
  const user = await getServerActionUser();
  const attendee = await getAttendee(searchParams.aaid);

  return attendee ? (
    <TournamentPartnerForm ip={ip} user={user} attendee={attendee} />
  ) : (
    <PickleballContactForm ip={ip} user={user} />
  );
}
