import { useState } from 'react';
import { CreateProjectForm } from '../../components/CreateProjectForm/CreateProjectForm';
import DeleteModal from '../../components/DeleteModal/DeleteModal';
import NewProject from './components/NewProject/NewProject';
import Project from './components/Project/Project';
import { useTranslation } from 'react-i18next';
import { useDeleteBoardByIdMutation } from '../../redux/query/BoardsQuery';
import { useGetBoards } from '../../hooks/useGetBoards';
import { getUserCookie } from '../../helper/Helper';
import { Preloader } from '../../components/Preloader/Preloader';
import { ReactComponent as PersonalIco } from '../../assets/icons/personal_icon.svg';
import { ReactComponent as CommonIco } from '../../assets/icons/common_icon.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setPersonalProjects } from '../../redux/reducer/UserSlice';
import { toast } from 'react-toastify';

export const ProjectsPage = () => {
  const { personalProjects } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const [isDeleteActive, setIsDeleteActive] = useState(false);
  const [currentIdToDelete, setCurrentIdToDelete] = useState('');
  const [isProjectModalActive, setisProjectModalActive] = useState(false);
  const { t } = useTranslation();
  const { _id } = getUserCookie()!;
  const [deleteProject] = useDeleteBoardByIdMutation();
  const { data: projects = [], isFetching, error } = useGetBoards(personalProjects, _id);
  const handleProjectIsActive = (value: boolean) => {
    setisProjectModalActive(value);
  };

  const handleDeleteIsActive = (value: boolean) => {
    setIsDeleteActive(value);
  };

  const callbackDelete = () => {
    try {
      deleteProject({ id: currentIdToDelete });
      handleDeleteIsActive(false);
      toast(t('deleteProject_success'), {
        containerId: 'success',
      });
    } catch (error) {
      toast(t('setData_error'), {
        containerId: 'error',
      });
    }
  };

  const closeModal = () => {
    setIsDeleteActive(false);
  };

  return (
    <>
      {(isFetching && <Preloader />) || (
        <section className="projects">
          <div className="container">
            <div
              onClick={() => dispatch(setPersonalProjects(!personalProjects))}
              className="projects__toggler"
            >
              <h2 className="title title__projects">{t('main_title')}</h2>
              {personalProjects ? <PersonalIco /> : <CommonIco />}
            </div>
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
