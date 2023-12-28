import TournamentCreateForm from '@lib/components/PageForms/TournamentCreateForm';
import { extractIP } from '@lib/utils/location';
import { headers } from 'next/headers';

export default async function TournamentCreateFormPage() {
  const ip = extractIP(headers());
  return <TournamentCreateForm ip={ip} />;
}
