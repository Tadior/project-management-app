import react from 'react';
import { NavLink } from 'react-router-dom';
import projectImg from '../../../../assets/images/save-add.png';
import trashCan from '../../../../assets/icons/trash_icon.png';

interface IProjectProps {
  updateState: (value: boolean) => void;
  updateId: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  description: string;
  id?: string;
}

const Project = ({ updateState, title, description, id, updateId }: IProjectProps) => {
  const handleClick = (event: React.MouseEvent<EventTarget>) => {
    const target = event.target as HTMLElement;
    updateId(target.id);
    updateState(true);
    // {
    //   id && updateId(id);
    // }
  };

  return (
    <NavLink className="project" to="qwe" id={id}>
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
            handleClick(event);
          }}
        >
          <img id={id} src={trashCan} alt="trash can" />
        </div>
      </div>
    </NavLink>
  );
};

export default Project;
