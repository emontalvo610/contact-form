import ClubContactForm from '@lib/components/PageForms/ClubContactForm';
import { extractIP } from '@lib/utils/location';
import { headers } from 'next/headers';

export default async function ClubContactFormPage() {
  const ip = extractIP(headers());
  return <ClubContactForm ip={ip} />;
}
