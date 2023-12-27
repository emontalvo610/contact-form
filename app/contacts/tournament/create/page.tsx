import { headers } from 'next/headers';
import { extractIP } from '@lib/utils/location';
import TournamentCreateForm from '@lib/components/PageForms/TournamentCreateForm';

export default async function TournamentCreateFormPage() {
  const ip = extractIP(headers());
  return <TournamentCreateForm ip={ip} />;
}
