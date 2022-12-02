import { useState } from 'react';
import { CreateProjectForm } from '../../components/CreateProjectForm/CreateProjectForm';
import DeleteModal from '../../components/DeleteModal/DeleteModal';
import NewProject from './components/NewProject/NewProject';
import Project from './components/Project/Project';
import { useTranslation } from 'react-i18next';
import {
  useCreateBoardMutation,
  useDeleteBoardByIdMutation,
  useGetBoardsSetByIdQuery,
} from '../../redux/query/BoardsQuery';
import { ICreateForm } from '../../types/types';
import { SubmitHandler } from 'react-hook-form';
import { getUserCookie } from '../../helper/Helper';
import { Preloader } from '../../components/Preloader/Preloader';

export const ProjectsPage = () => {
  const { _id } = getUserCookie()!;

  const { data: projects = [], isFetching } = useGetBoardsSetByIdQuery({ id: _id });
  const [deleteProject] = useDeleteBoardByIdMutation();
  const { t } = useTranslation();
  const [isProjectModalActive, setisProjectModalActive] = useState(false);
  const [isDeleteActive, setIsDeleteActive] = useState(false);
  const [currentIdToDelete, setCurrentIdToDelete] = useState('');
  const handleProjectIsActive = (value: boolean) => {
    setisProjectModalActive(value);
  };
  const [createBoard] = useCreateBoardMutation();
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

  const callbackToSubmit: SubmitHandler<ICreateForm> = async (data) => {
    const newProject = await createBoard({
      title: data.title,
      owner: _id,
      users: [data.text],
    }).unwrap();
    handleProjectIsActive(false);
  };

  return (
    <>
      {(isFetching && <Preloader />) || (
        <section className="projects">
          <div className="container">
            <h2 className="title title__projects">{t('main_title')}</h2>
            <div className="projects__wrapper">
              <>
                {projects.map((current) => {
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
                    typeOfForm={''}
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
      )}
    </>
  );
};
