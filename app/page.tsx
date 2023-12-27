import { headers } from 'next/headers';
import PickleballContactForm from '@lib/components/PageForms/PickleballContactForm';
import { extractIP } from '@lib/utils/location';

export default async function ContactFormPage() {
  const ip = extractIP(headers());
  return <PickleballContactForm ip={ip} />;
}
