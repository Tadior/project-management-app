import { useState } from 'react';
import { CreateProjectForm } from './components/CreateProjectForm/CreateProjectForm';
import DeleteModal from '../../components/DeleteModal/DeleteModal';
import NewProject from './components/NewProject/NewProject';
import Project from './components/Project/Project';
import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router-dom';
import { boardsApi } from '../../types/types';
import { useDeleteBoardByIdMutation } from '../../redux/query/BoardsQuery';

const PROJECT_INITIAL: boardsApi[] = [
  {
    _id: '',
    title: '',
    owner: '',
    users: [''],
  },
];

export const ProjectsPage = () => {
  const projects = useLoaderData() as boardsApi[];
  const { t } = useTranslation();
  const [isProjectModalActive, setisProjectModalActive] = useState(false);
  const [isDeleteActive, setIsDeleteActive] = useState(false);
  const [currentIdToDelete, setCurrentIdToDelete] = useState('');
  const [projectsState, setProjectsState] = useState(projects ? projects : PROJECT_INITIAL);
  const [deleteProject, deletedProject] = useDeleteBoardByIdMutation();
  const handleProjectIsActive = (value: boolean) => {
    setisProjectModalActive(value);
  };
  const handleDeleteIsActive = (value: boolean) => {
    setIsDeleteActive(value);
  };

  const filterProjects = (projects: boardsApi[], id: string) => {
    return projects.filter((element) => {
      if (element._id === id) {
        return false;
      }
      return true;
    });
  };
  const callbackDelete = () => {
    deleteProject({ id: currentIdToDelete });
    setProjectsState(filterProjects(projectsState, currentIdToDelete));
    handleDeleteIsActive(false);
  };

  const closeModal = () => {
    setIsDeleteActive(false);
  };

  return (
    <section className="projects">
      <div className="container">
        <h2 className="title title__projects">{t('main_title')}</h2>
        <div className="projects__wrapper">
          <>
            {projectsState &&
              projectsState.map((current) => {
                return (
                  <Project
                    updateId={setCurrentIdToDelete}
                    id={current._id}
                    updateState={handleDeleteIsActive}
                    key={current._id}
                    title={current.title}
                    description={current.users[0]}
                  />
                );
              })}
            <NewProject updateState={handleProjectIsActive} />
            {isProjectModalActive && (
              <CreateProjectForm
                projects={projectsState}
                currentId={currentIdToDelete}
                updateState={handleProjectIsActive}
                updateProjects={setProjectsState}
              />
            )}
            {isDeleteActive && (
              <DeleteModal callbackDelete={callbackDelete} closeModal={closeModal} />
            )}
          </>
        </div>
      </div>
    </section>
  );
};
