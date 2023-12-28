import PickleballContactForm from '@lib/components/PageForms/PickleballContactForm';
import { getServerActionSession } from '@lib/server/session/session';
import { extractIP } from '@lib/utils/location';
import { headers } from 'next/headers';

export default async function ContactFormPage() {
  const ip = extractIP(headers());
  const session = await getServerActionSession();
  // eslint-disable-next-line unused-imports/no-unused-vars
  const { user } = session;

  return <PickleballContactForm ip={ip} />;
}
