import { headers } from 'next/headers';
import PickleballContactForm from '@lib/components/PageForms/PickleballContactForm';
import { extractIP } from '@lib/utils/location';
import { getServerActionSession } from '@lib/server/session/session';

export default async function ContactFormPage() {
  const ip = extractIP(headers());
  const session = await getServerActionSession();
  const { user } = session;

  return <PickleballContactForm ip={ip} />;
}
