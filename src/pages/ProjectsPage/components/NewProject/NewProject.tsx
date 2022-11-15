import react from 'react';
import icon from '../../../../assets/images/newProject_icon.png';

interface INewProjectProps {
  updateState: (value: boolean) => void;
}

const NewProject = ({ updateState }: INewProjectProps) => {
  const handleClick = () => {
    updateState(true);
  };
  return (
    <div className="new-project" onClick={() => handleClick()}>
      <div className="new-project__symbol">
        <img className="new-project__img" src={icon} alt="Add project" />
      </div>
    </div>
  );
};

export default NewProject;
