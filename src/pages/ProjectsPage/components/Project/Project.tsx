import react from 'react';
import { NavLink } from 'react-router-dom';
import projectImg from '../../../../assets/images/save-add.png';
import trashCan from '../../../../assets/icons/trash_icon.png';

const Project = () => {
  return (
    <NavLink className="project" to="qwe">
      <div className="project__wrapper">
        <div className="project__picture">
          <img src={projectImg} alt="project picture" className="project__img" />
        </div>
        <div className="project__info">
          <div className="project__title">Projects Manager</div>
          <div className="project__description">Our RSSchool project on React course</div>
        </div>
        <div
          className="project__trash"
          onClick={(event) => {
            console.log('done');
            event.preventDefault();
          }}
        >
          <img src={trashCan} alt="trash can" />
        </div>
      </div>
    </NavLink>
  );
};

export default Project;
