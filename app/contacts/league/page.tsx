import { headers } from 'next/headers';
import { extractIP } from '@lib/utils/location';
import LeagueContactForm from '@lib/components/PageForms/LeagueContactForm';

export default async function LeagueContactFormPage() {
  const ip = extractIP(headers());
  return <LeagueContactForm ip={ip} />;
}
