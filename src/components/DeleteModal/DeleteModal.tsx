import react from 'react';
import dangerImg from '../../assets/images/danger.png';
import { useDeleteBoardByIdMutation } from '../../redux/query/BoardsQuery';
import { boardsApi } from '../../types/types';
import { useTranslation } from 'react-i18next';

interface IDeleteModalProps {
  projects: boardsApi[];
  updateState: (value: boolean) => void;
  updateProjects: React.Dispatch<React.SetStateAction<boardsApi[]>>;
  currentId: string;
}

const DeleteModal = ({ projects, updateState, updateProjects, currentId }: IDeleteModalProps) => {
  const { t } = useTranslation();
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
        <div className="delete-modal__info">{t('delete_confirm')}</div>
        <div className="delete-modal__buttons">
          <button className="button-border" onClick={() => updateState(false)}>
            {t('cancel_btn')}
          </button>
          <button
            className="button-black"
            onClick={() => {
              handleDeleteProject();
            }}
          >
            {t('delete_btn')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
