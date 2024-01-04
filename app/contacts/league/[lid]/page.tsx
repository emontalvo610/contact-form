import LeagueContactForm from '@lib/components/PageForms/LeagueContactForm';
import PickleballContactForm from '@lib/components/PageForms/PickleballContactForm';
import { getLeague } from '@lib/server/api';
import { getServerActionUser } from '@lib/server/session/session';
import { extractIP } from '@lib/utils/location';
import { headers } from 'next/headers';

interface IPageProps {
  params: {
    lid: string;
  };
}

export default async function LeagueContactFormPage({ params }: IPageProps) {
  const ip = extractIP(headers());
  const user = await getServerActionUser();
  const league = await getLeague(params.lid);

  return league ? (
    <LeagueContactForm ip={ip} user={user} league={league} />
  ) : (
    <PickleballContactForm ip={ip} user={user} />
  );
}
