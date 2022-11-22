import { useState } from 'react';
import { CreateProjectForm } from './components/CreateProjectForm/CreateProjectForm';
import DeleteModal from '../../components/DeleteModal/DeleteModal';
import NewProject from './components/NewProject/NewProject';
import Project from './components/Project/Project';
import { useTranslation } from 'react-i18next';

import {
  useDeleteBoardByIdMutation,
  useGetBoardsSetByIdQuery,
} from '../../redux/query/BoardsQuery';
import { getCookieToken } from '../../helper/Helper';

export const ProjectsPage = () => {
  const { _id } = JSON.parse(getCookieToken('userData')!);

  const { data: projects = [], isFetching } = useGetBoardsSetByIdQuery({ id: _id });
  const [deleteProject, deletedProject] = useDeleteBoardByIdMutation();
  console.log(projects);
  const { t } = useTranslation();
  const [isProjectModalActive, setisProjectModalActive] = useState(false);
  const [isDeleteActive, setIsDeleteActive] = useState(false);
  const [currentIdToDelete, setCurrentIdToDelete] = useState('');
  const handleProjectIsActive = (value: boolean) => {
    setisProjectModalActive(value);
  };
  // console.log(currentIdToDelete);

  const handleDeleteIsActive = (value: boolean) => {
    setIsDeleteActive(value);
  };

  const callbackDelete = () => {
    deleteProject({ id: currentIdToDelete });
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
            {isFetching ||
              projects.map((current) => {
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
                projects={projects}
                // currentId={currentIdToDelete}
                updateState={handleProjectIsActive}
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
