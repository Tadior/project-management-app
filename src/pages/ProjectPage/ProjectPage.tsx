import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { columnApi } from '../../types/types';
import ColumnModal from './components/ColumnModal/ColumnModal';
import NewColumnBtn from './components/NewColumnBtn/NewColumnBtn';
import { useLoaderData } from 'react-router-dom';
import { store } from '../../App';
import Column from './components/Column/Column';
const INITIAL_VALUE: columnApi[] = [
  {
    _id: '',
    boardId: '',
    title: '',
    order: 0,
  },
];
const ProjectPage = () => {
  const title = useParams().title;
  const projectId = store.getState().userReducer.activeProjectId;
  const columnsInitial = useLoaderData() as columnApi[];
  const [isColumnModalActive, setColumnModalActive] = useState(false);
  const [columns, setColumns] = useState(columnsInitial ? columnsInitial : INITIAL_VALUE);
  const columnModalCallback = (value: boolean) => {
    setColumnModalActive(value);
  };
  const updateColumns = (newColumns: columnApi[]) => {
    setColumns(newColumns);
  };
  return (
    <section className="project-page">
      <div className="container">
        <div className="container">
          <h2 className="title project-page__title">{title}</h2>
          <div className="project-page__wrapper">
            {columns &&
              columns[0] &&
              columns.map((column) => {
                return <Column title={column.title} key={column._id} />;
              })}
            <NewColumnBtn updateModalState={() => columnModalCallback(true)} />
          </div>
        </div>
      </div>
      {isColumnModalActive && (
        <ColumnModal
          columns={columns}
          updateModalState={() => columnModalCallback(false)}
          currentId={projectId}
          updateColumnsState={updateColumns}
        />
      )}
    </section>
  );
};

export default ProjectPage;
