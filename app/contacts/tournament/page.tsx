import PickleballContactForm from '@lib/components/PageForms/PickleballContactForm';
import TournamentConactForm from '@lib/components/PageForms/TournamentContactForm';
import { getTournament } from '@lib/server/api';
import { getServerActionUser } from '@lib/server/session/session';
import { extractIP } from '@lib/utils/location';
import { headers } from 'next/headers';

interface IPageProps {
  searchParams: {
    eid: string;
  };
}

export default async function TournamentConactFormPage({
  searchParams
}: IPageProps) {
  const ip = extractIP(headers());
  const user = await getServerActionUser();
  const tournament = await getTournament(searchParams.eid);

  return tournament ? (
    <TournamentConactForm ip={ip} user={user} tournament={tournament} />
  ) : (
    <PickleballContactForm ip={ip} user={user} />
  );
}
