import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { columnApi } from '../../types/types';
import ColumnModal from './components/ColumnModal/ColumnModal';
import NewColumnBtn from './components/NewColumnBtn/NewColumnBtn';
import { useLoaderData } from 'react-router-dom';
import { store } from '../../App';
import Column from './components/Column/Column';
import {
  useDeleteColumnByIdMutation,
  useUpdateColumnSetMutation,
} from '../../redux/query/ColumnsQuery';
import INITIAL_VALUE from '../ProjectsPage/consts/INITIAL_VALUE';
import IColumnsBody from '../ProjectsPage/types/types';

const ProjectPage = () => {
  const title = useParams().title;
  const projectId = store.getState().userReducer.activeProjectId;
  const columnsInitial = useLoaderData() as columnApi[];
  const [currentColumn, setCurrentColumn] = useState(
    columnsInitial ? columnsInitial[0] : INITIAL_VALUE[0]
  );
  const [isColumnModalActive, setColumnModalActive] = useState(false);
  const [updateSetOfColumns, setOfColumnsData] = useUpdateColumnSetMutation();
  const [deleteColumnRequest, deleteColumnData] = useDeleteColumnByIdMutation();
  const sortColumns = (columns: columnApi[]) => {
    return columns.sort((a, b) => {
      return a.order - b.order;
    });
  };

  const [columns, setColumns] = useState(
    columnsInitial ? sortColumns(columnsInitial) : INITIAL_VALUE
  );

  const columnModalCallback = (value: boolean) => {
    setColumnModalActive(value);
  };

  const updateColumns = (newColumns: columnApi[]) => {
    setColumns(newColumns);
  };

  const deleteColumn = (columnId: string) => {
    try {
      deleteColumnRequest({ boardId: projectId, columnId: columnId });
      const allColumns = [...columns];
      const newColumns = allColumns.filter((column) => column._id !== columnId);
      setColumns(newColumns);
    } catch (error) {
      throw error;
    }
  };

  const updateColumnsData = (columnItem: columnApi) => {
    const allColumns = [...columns];
    const newOrder = allColumns.map((column) => {
      if (column._id === columnItem._id) {
        return { ...column, order: currentColumn.order };
      }
      if (column._id === currentColumn._id) {
        return { ...column, order: columnItem.order };
      }
      return column;
    });
    const sortData = sortColumns(newOrder);
    updateColumns(sortData);
    const requestBody: IColumnsBody[] = [
      { _id: columnItem._id, order: currentColumn.order },
      { _id: currentColumn._id, order: columnItem.order },
    ];
    updateSetOfColumns({ body: requestBody });
  };

  const updateCurrentColumns = (column: columnApi) => {
    setCurrentColumn(column);
  };

  return (
    <section className="project-page">
      <div className="container project-page__container">
        <h2 className="title project-page__title">{title}</h2>
        <div className="project-page__wrapper">
          {columns &&
            columns[0] &&
            columns.map((column) => {
              return (
                <Column
                  data={column}
                  deleteCallback={deleteColumn}
                  projectId={projectId}
                  updateColumnsCallback={updateColumnsData}
                  updateCurrentColumn={updateCurrentColumns}
                  key={column._id}
                />
              );
            })}
          <div className="project-page__btn">
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
