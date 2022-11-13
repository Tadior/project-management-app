import React from 'react';
import { teamMember } from '../../../types/types';

type TeamCardProps = {
  card: teamMember;
};

const TeamCard = (props: TeamCardProps) => {
  return (
    <div className="member">
      <div className="member__info">
        <div className="member__info-img">
          <img src={props.card.img} alt={props.card.name} />
        </div>
        <div className="member__info-details">
          <h5 className="member-name">{props.card.name}</h5>
          <h5 className="member-position">{props.card.position}</h5>
        </div>
      </div>
      <p className="member__role">{props.card.role}</p>
      <a
        href={props.card.github}
        rel="noreferrer"
        target="_blank"
        className="member-btn button-black"
      >
        GitHub
      </a>
    </div>
  );
};

export default TeamCard;
