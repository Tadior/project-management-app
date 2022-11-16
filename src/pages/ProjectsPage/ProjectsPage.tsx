import React, { useState } from 'react';
import { CreateProjectForm } from './components/CreateProjectForm/CreateProjectForm';
import DeleteModal from '../../components/DeleteModal/DeleteModal';
import { setTokenToCookie } from '../../helper/Helper';
import { useSignInMutation } from '../../redux/query/AuthQuery';
import { useCreateBoardMutation, useGetBoardsMutation } from '../../redux/query/BoardsQuery';
import NewProject from './components/NewProject/NewProject';
import Project from './components/Project/Project';
import { useGetUsersMutation } from '../../redux/query/UsersQuery';
const PROJECT_INITIAL = [
  {
    _id: '',
    title: '',
    owner: '',
    users: [''],
  },
];
export const ProjectsPage = () => {
  const [isProjectModalActive, setisProjectModalActive] = useState(false);
  const [isDeleteActive, setIsDeleteActive] = useState(false);
  const [currentIdToDelete, setCurrentIdToDelete] = useState('');
  const [projectsState, setProjectsState] = useState(PROJECT_INITIAL);
  const [getProjects, projectsData] = useGetBoardsMutation();
  const [getToken, tokenData] = useSignInMutation();
  const [createBoard, boardData] = useCreateBoardMutation();
  const [getUsers, usersData] = useGetUsersMutation();
  const handleProjectIsActive = (value: boolean) => {
    setisProjectModalActive(value);
  };
  const handleDeleteIsActive = (value: boolean) => {
    setIsDeleteActive(value);
  };
  const handleBoards = async () => {
    try {
      const out = await getProjects().unwrap();
      setProjectsState(out);
      console.log(out);
      console.log(projectsState);
    } catch (error) {
      throw error;
    }
  };
  const createNewBoard = async () => {
    try {
      const out = await createBoard({
        title: 'some project',
        owner:
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi ipsam, ducimus sint sit, perferendis praesentium nihil recusandae fugiat beatae aperiam perspiciatis at hic ab illo veniam, laboriosam facilis minus laudantium.',
        users: ['string'],
      }).unwrap();
      console.log(out);
    } catch (error) {
      throw error;
    }
  };

  return (
    <section className="projects">
      <div className="container">
        <h2 className="title title__projects">Your Magic Projects</h2>
        <button
          className="button-black"
          onClick={async () => {
            const out = await getToken({
              login: 'IMask',
              password: 'Tesla4ever',
            }).unwrap();
            console.log(out);
            setTokenToCookie(out.token);
          }}
        >
          get Token
        </button>
        <button
          className="button-black"
          onClick={() => {
            handleBoards();
          }}
        >
          get Projects
        </button>
        <button
          className="button-black"
          onClick={() => {
            createNewBoard();
          }}
        >
          CreateBoard
        </button>
        <button
          className="button-black"
          onClick={() => {
            getUsers();
            console.log(usersData);
          }}
        >
          Get users
        </button>
        <div className="projects__wrapper">
          <>
            {projectsState &&
              projectsState[0].title != '' &&
              projectsState.map((current) => {
                return (
                  <Project
                    updateId={setCurrentIdToDelete}
                    id={current._id}
                    updateState={handleDeleteIsActive}
                    key={current._id}
                    title={current.title}
                    description={current.owner}
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
              <DeleteModal
                projects={projectsState}
                currentId={currentIdToDelete}
                updateProjects={setProjectsState}
                updateState={handleDeleteIsActive}
              />
            )}
          </>
        </div>
      </div>
    </section>
  );
};

/* <div>
        <CreateProjectForm />;
      </div> */
