import { headers } from 'next/headers';
import { extractIP } from '@lib/utils/location';
import ClubCreateForm from '@lib/components/PageForms/ClubCreateForm';

export default async function ClubCreateFormPage() {
  const ip = extractIP(headers());
  return <ClubCreateForm ip={ip} />;
}
