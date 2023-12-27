import { headers } from 'next/headers';
import { extractIP } from '@lib/utils/location';
import TournamentPartnerForm from '@lib/components/PageForms/TournamentPartnerForm';

export default async function TournamentPartnerFormPage() {
  const ip = extractIP(headers());
  return <TournamentPartnerForm ip={ip} />;
}
