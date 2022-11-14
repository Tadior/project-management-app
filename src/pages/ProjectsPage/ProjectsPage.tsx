import React from 'react';
import { CreateProjectForm } from '../../components/CreateProjectForm/CreateProjectForm';
import DeleteModal from '../../components/DeleteModal/DeleteModal';
import NewProject from './components/NewProject/NewProject';
import Project from './components/Project/Project';

export const ProjectsPage = () => {
  return (
    <section className="projects">
      <div className="container">
        <h2 className="title title__projects">Your Magic Projects</h2>
        <div className="projects__wrapper">
          <Project />
          <Project />
          <NewProject />
          {/* <DeleteModal /> */}
        </div>
      </div>
    </section>
  );
};

/* <div>
        <CreateProjectForm />;
      </div> */
