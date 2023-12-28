import LeagueCreateForm from '@lib/components/PageForms/LeagueCreateForm';
import { getServerActionUser } from '@lib/server/session/session';
import { extractIP } from '@lib/utils/location';
import { headers } from 'next/headers';

export default async function LeagueCreateFormPage() {
  const ip = extractIP(headers());
  const user = await getServerActionUser();

  return <LeagueCreateForm ip={ip} user={user} />;
}
