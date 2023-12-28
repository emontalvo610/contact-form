import LeagueCreateForm from '@lib/components/PageForms/LeagueCreateForm';
import { extractIP } from '@lib/utils/location';
import { headers } from 'next/headers';

export default async function LeagueCreateFormPage() {
  const ip = extractIP(headers());
  return <LeagueCreateForm ip={ip} />;
}
