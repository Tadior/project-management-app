import react from 'react';
import icon from '../../../../assets/images/newProject_icon.png';
const NewProject = () => {
  return (
    <div className="new-project">
      <div className="new-project__symbol">
        <img className="new-project__img" src={icon} alt="Add project" />
      </div>
    </div>
  );
};

export default NewProject;
