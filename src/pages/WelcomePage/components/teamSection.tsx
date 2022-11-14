import React from 'react';
import { TEAM } from '../constants';
import TeamCard from './TeamCard';
import { useTranslation } from 'react-i18next';
import { teamMember } from '../../../types/types';

const TeamSection = () => {
  const { t } = useTranslation();
  const team = t<string, teamMember[]>('welcome_team', { returnObjects: true });
  return (
    <section className="team">
      <div className="container">
        <h3 className="team__title section-title">{t('welcome_team_title')}</h3>
        <div className="team__cards">
          {team.map((member) => (
            <TeamCard key={member.name} card={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
