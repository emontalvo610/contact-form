import TournamentCreateForm from '@lib/components/PageForms/TournamentCreateForm';
import { getServerActionUser } from '@lib/server/session/session';
import { extractIP } from '@lib/utils/location';
import { headers } from 'next/headers';

export default async function TournamentCreateFormPage() {
  const ip = extractIP(headers());
  const user = await getServerActionUser();

  return <TournamentCreateForm ip={ip} user={user} />;
}
