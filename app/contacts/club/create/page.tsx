import ClubCreateForm from '@lib/components/PageForms/ClubCreateForm';
import { extractIP } from '@lib/utils/location';
import { headers } from 'next/headers';

export default async function ClubCreateFormPage() {
  const ip = extractIP(headers());
  return <ClubCreateForm ip={ip} />;
}
