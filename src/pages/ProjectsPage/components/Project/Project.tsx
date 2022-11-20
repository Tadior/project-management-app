import React from 'react';
import { NavLink } from 'react-router-dom';
import projectImg from '../../../../assets/images/save-add.png';
import trashCan from '../../../../assets/icons/trash_icon.png';
import { userSlice } from '../../../../redux/reducer/UserSlice';
import { useAppDispatch } from '../../../../hooks/redux';

interface IProjectProps {
  updateState: (value: boolean) => void;
  updateId: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  description: string;
  id?: string;
}

const Project = ({ updateState, title, description, id, updateId }: IProjectProps) => {
  const dispatch = useAppDispatch();
  const { setActiveProjectId } = userSlice.actions;
  const handleClick = () => {
    updateState(true);
    {
      id && updateId(id);
    }
  };

  return (
    <NavLink
      className="project"
      to={`/projects/${title}`}
      id={id}
      onClick={() => dispatch(setActiveProjectId(id!))}
    >
      <div className="project__wrapper">
        <div className="project__picture">
          <img src={projectImg} alt="project picture" className="project__img" />
        </div>
        <div className="project__info">
          <div className="project__title">{title}</div>
          <div className="project__description">{description}</div>
        </div>
        <div
          className="project__trash"
          onClick={(event) => {
            event.preventDefault();
            handleClick();
          }}
        >
          <img src={trashCan} alt="trash can" />
        </div>
      </div>
    </NavLink>
  );
};

export default Project;
