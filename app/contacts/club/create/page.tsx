import ClubCreateForm from '@lib/components/PageForms/ClubCreateForm';
import { getServerActionUser } from '@lib/server/session/session';
import { extractIP } from '@lib/utils/location';
import { headers } from 'next/headers';

export default async function ClubCreateFormPage() {
  const ip = extractIP(headers());
  const user = await getServerActionUser();

  return <ClubCreateForm ip={ip} user={user} />;
}
