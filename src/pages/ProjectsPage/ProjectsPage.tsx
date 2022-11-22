import { useState } from 'react';
import { CreateProjectForm } from '../../components/CreateProjectForm/CreateProjectForm';
import DeleteModal from '../../components/DeleteModal/DeleteModal';
import NewProject from './components/NewProject/NewProject';
import Project from './components/Project/Project';
import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router-dom';
import { boardsApi } from '../../types/types';
import { useCreateBoardMutation, useDeleteBoardByIdMutation } from '../../redux/query/BoardsQuery';
import { ICreateForm } from '../../types/types';
import { SubmitHandler } from 'react-hook-form';
import { useAppSelector } from '../../hooks/redux';
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
  const { _id, login, name } = useAppSelector((state) => state.userReducer.userData);
  const [createBoard, boardInfo] = useCreateBoardMutation();
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

  const callbackToSubmit: SubmitHandler<ICreateForm> = async (data) => {
    const newProject = await createBoard({
      title: data.title,
      owner: _id,
      users: [data.text],
    }).unwrap();
    const allProjects = [...projectsState].concat(newProject);
    setProjectsState(allProjects);
    handleProjectIsActive(false);
  };

  return (
    <section className="projects">
      <div className="container">
        <h2 className="title title__projects">{t('main_title')}</h2>
        <div className="projects__wrapper">
          <>
            {projectsState &&
              projectsState[0] &&
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
                updateState={handleProjectIsActive}
                updateProjects={setProjectsState}
                typeOfForm="create_project"
                callbackToSubmit={callbackToSubmit}
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
