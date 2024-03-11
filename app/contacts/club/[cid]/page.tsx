import ClubContactForm from '@lib/components/PageForms/ClubContactForm';
import PickleballContactForm from '@lib/components/PageForms/PickleballContactForm';
import { getClub } from '@lib/server/api';
import { getServerActionUser } from '@lib/server/session/session';
import { extractIP } from '@lib/utils/location';
import { headers } from 'next/headers';

interface IPageProps {
  params: {
    cid: string;
  };
}

export default async function ClubContactFormPage({ params }: IPageProps) {
  const ip = extractIP(headers());
  const user = await getServerActionUser();
  const club = await getClub(params.cid);

  return club ? (
    <ClubContactForm ip={ip} user={user} club={club} />
  ) : (
    <PickleballContactForm ip={ip} user={user} />
  );
}
