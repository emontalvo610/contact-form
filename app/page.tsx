import PickleballContactForm from '@lib/components/PageForms/PickleballContactForm';
import { getServerActionUser } from '@lib/server/session/session';
import { extractIP } from '@lib/utils/location';
import { headers } from 'next/headers';

export default async function ContactFormPage() {
  const ip = extractIP(headers());
  const user = await getServerActionUser();

  return <PickleballContactForm ip={ip} user={user} />;
}
