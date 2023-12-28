import LeagueContactForm from '@lib/components/PageForms/LeagueContactForm';
import { getServerActionUser } from '@lib/server/session/session';
import { extractIP } from '@lib/utils/location';
import { headers } from 'next/headers';

export default async function LeagueContactFormPage() {
  const ip = extractIP(headers());
  const user = await getServerActionUser();

  return <LeagueContactForm ip={ip} user={user} />;
}
