import LeagueContactForm from '@lib/components/PageForms/LeagueContactForm';
import { extractIP } from '@lib/utils/location';
import { headers } from 'next/headers';

export default async function LeagueContactFormPage() {
  const ip = extractIP(headers());
  return <LeagueContactForm ip={ip} />;
}
