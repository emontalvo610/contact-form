import { headers } from 'next/headers';
import { extractIP } from '@lib/utils/location';
import ClubContactForm from '@lib/components/PageForms/ClubContactForm';

export default async function ClubContactFormPage() {
  const ip = extractIP(headers());
  return <ClubContactForm ip={ip} />;
}
