import TournamentPartnerForm from '@lib/components/PageForms/TournamentPartnerForm';
import { extractIP } from '@lib/utils/location';
import { headers } from 'next/headers';

export default async function TournamentPartnerFormPage() {
  const ip = extractIP(headers());
  return <TournamentPartnerForm ip={ip} />;
}
