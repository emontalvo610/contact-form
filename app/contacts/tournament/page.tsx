import TournamentConactForm from '@lib/components/PageForms/TournamentContactForm';
import { getServerActionUser } from '@lib/server/session/session';
import { extractIP } from '@lib/utils/location';
import { headers } from 'next/headers';

export default async function TournamentConactFormPage() {
  const ip = extractIP(headers());
  const user = await getServerActionUser();

  return <TournamentConactForm ip={ip} user={user} />;
}
