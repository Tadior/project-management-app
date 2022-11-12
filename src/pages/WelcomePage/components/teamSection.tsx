import React from 'react';
import { TEAM } from '../constants';
import TeamCard from './TeamCard';

const TeamSection = () => {
  return (
    <section className="team">
      <div className="container">
        <h3 className="team__title section-title">Main wizards</h3>
        <div className="team__cards">
          {TEAM.map((member) => (
            <TeamCard key={member.name} card={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
