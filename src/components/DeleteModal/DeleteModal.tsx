import react from 'react';
import dangerImg from '../../assets/images/danger.png';
import { useDeleteBoardByIdMutation } from '../../redux/query/BoardsQuery';
import { boardsApi } from '../../types/types';

interface IDeleteModalProps {
  projects: boardsApi[];
  updateState: (value: boolean) => void;
  updateProjects: React.Dispatch<React.SetStateAction<boardsApi[]>>;
  currentId: string;
}

const DeleteModal = ({ projects, updateState, updateProjects, currentId }: IDeleteModalProps) => {
  const [deleteProject, deletedProject] = useDeleteBoardByIdMutation();

  const filterProjects = (projects: boardsApi[], id: string) => {
    return projects.filter((element) => {
      if (element._id === id) {
        return false;
      }
      return true;
    });
  };

  const handleDeleteProject = () => {
    deleteProject({ id: currentId });
    updateProjects(filterProjects(projects, currentId));
    updateState(false);
  };

  return (
    <div className="delete-modal" onClick={() => updateState(false)}>
      <div
        className="delete-modal__wrapper"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <img src={dangerImg} alt="warning" className="delete-modal__img" />
        <div className="delete-modal__info">Are you sure, that you want to delete this?</div>
        <div className="delete-modal__buttons">
          <button className="button-border" onClick={() => updateState(false)}>
            Cancel
          </button>
          <button
            className="button-black"
            onClick={() => {
              handleDeleteProject();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
