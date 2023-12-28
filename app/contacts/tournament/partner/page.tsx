import TournamentPartnerForm from '@lib/components/PageForms/TournamentPartnerForm';
import { getServerActionUser } from '@lib/server/session/session';
import { extractIP } from '@lib/utils/location';
import { headers } from 'next/headers';

export default async function TournamentPartnerFormPage() {
  const ip = extractIP(headers());
  const user = await getServerActionUser();

  return <TournamentPartnerForm ip={ip} user={user} />;
}
