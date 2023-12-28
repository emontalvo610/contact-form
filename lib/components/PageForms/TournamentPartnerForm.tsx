'use client';

import { ContactType } from '@lib/hooks/contact';
import type { IUser } from '@lib/types/user';
import { getAllMixDoubleSkillOptions } from '@lib/utils/mixDoubleSkill';

import ContactFormGeneralTemplate from '../Templates/ContactFormGeneralTemplate';

interface IFormProps {
  ip: string;
  user?: IUser;
}
export default function TournamentPartnerForm(props: IFormProps) {
  const mixDoubleSkillOptions = getAllMixDoubleSkillOptions();

  return (
    <ContactFormGeneralTemplate
      ip={props.ip}
      user={props.user}
      title="Contact a player to partner with"
      subtitle=""
      mixDoubleSkillOptions={mixDoubleSkillOptions}
      contactType={ContactType.TournamentPartner}
    />
  );
}
