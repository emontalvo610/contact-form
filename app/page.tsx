import { headers } from 'next/headers';
import ContactForm from '@lib/components/PageForms/ContactForm';
import { extractIP } from '@lib/utils/location';

export default async function ContactFormPage() {
  const ip = extractIP(headers());
  return <ContactForm ip={ip} />;
}
