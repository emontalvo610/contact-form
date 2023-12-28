import TournamentConactForm from '@lib/components/PageForms/TournamentContactForm';
import { extractIP } from '@lib/utils/location';
import { headers } from 'next/headers';

export default async function TournamentConactFormPage() {
  const ip = extractIP(headers());
  return <TournamentConactForm ip={ip} />;
}
