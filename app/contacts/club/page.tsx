import ClubContactForm from '@lib/components/PageForms/ClubContactForm';
import { getServerActionUser } from '@lib/server/session/session';
import { extractIP } from '@lib/utils/location';
import { headers } from 'next/headers';

export default async function ClubContactFormPage() {
  const ip = extractIP(headers());
  const user = await getServerActionUser();

  return <ClubContactForm ip={ip} user={user} />;
}
