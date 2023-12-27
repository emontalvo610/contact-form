'use client';

import { getAllMixDoubleSkillOptions } from '@lib/utils/mixDoubleSkill';
import ContactFormGeneralTemplate from '../Templates/ContactFormGeneralTemplate';
import { ContactType } from '@lib/hooks/contact';

interface IFormProps {
  ip: string;
};
export default function TournamentPartnerForm(props: IFormProps) {
  const mixDoubleSkillOptions = getAllMixDoubleSkillOptions();
  
  return (
    <ContactFormGeneralTemplate
      ip={props.ip}
      title="Contact a player to partner with"
      subtitle=""
      shouldIncludeMixDoubleSkill={true}
      mixDoubleSkillOptions={mixDoubleSkillOptions}
      contactType={ContactType.TournamentPartner}
    />
  )
}
