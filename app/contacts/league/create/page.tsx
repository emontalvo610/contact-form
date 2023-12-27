import { headers } from 'next/headers';
import { extractIP } from '@lib/utils/location';
import LeagueCreateForm from '@lib/components/PageForms/LeagueCreateForm';

export default async function LeagueCreateFormPage() {
  const ip = extractIP(headers());
  return <LeagueCreateForm ip={ip} />;
}
