import { headers } from 'next/headers';
import { extractIP } from '@lib/utils/location';
import TournamentConactForm from '@lib/components/PageForms/TournamentContactForm';

export default async function TournamentConactFormPage() {
  const ip = extractIP(headers());
  return <TournamentConactForm ip={ip} />;
}
