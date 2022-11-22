import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { columnApi, ICreateForm, ICreateTasksBody } from '../../types/types';
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
import { CreateProjectForm } from '../../components/CreateProjectForm/CreateProjectForm';
import { useCreateTaskMutation } from '../../redux/query/TasksQuery';
import { columnApiWithTasks } from '../../types/types';
import { SubmitHandler } from 'react-hook-form';
const ProjectPage = () => {
  console.log('loader');
  console.log(useLoaderData());
  const loaderData = useLoaderData() as columnApiWithTasks[];
  const title = useParams().title;
  const projectId = store.getState().userReducer.activeProjectId;
  const { _id, login } = store.getState().userReducer.userData;
  const [currentColumn, setCurrentColumn] = useState(loaderData ? loaderData[0] : INITIAL_VALUE[0]);
  const [isProjectModalActive, setisProjectModalActive] = useState(false);
  const [isColumnModalActive, setColumnModalActive] = useState(false);
  const [columnActiveId, setColumnActiveId] = useState('');
  const [updateSetOfColumns, setOfColumnsData] = useUpdateColumnSetMutation();
  const [deleteColumnRequest, deleteColumnData] = useDeleteColumnByIdMutation();
  const [createTask, taskInfo] = useCreateTaskMutation();
  const sortColumns = (columns: columnApiWithTasks[]) => {
    return columns.sort((a, b) => {
      return a.order - b.order;
    });
  };

  const handleProjectIsActive = (value: boolean) => {
    setisProjectModalActive(value);
  };

  const [columns, setColumns] = useState(loaderData ? sortColumns(loaderData) : INITIAL_VALUE);

  const columnModalCallback = (value: boolean) => {
    setColumnModalActive(value);
  };

  const updateColumns = (newColumns: columnApiWithTasks[]) => {
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

  const updateCurrentColumns = (column: columnApiWithTasks) => {
    setCurrentColumn(column);
  };

  const updateColumnActive = (id: string) => {
    setColumnActiveId(id);
  };
  const updateModalActive = () => {
    setisProjectModalActive(!isProjectModalActive);
  };
  const callbackToSubmit: SubmitHandler<ICreateForm> = async (arg) => {
    const taskBody: ICreateTasksBody = {
      title: arg.title,
      order: 0,
      description: arg.text,
      userId: _id,
      users: [login],
    };
    const newTask = await createTask({
      boardId: projectId,
      columnId: columnActiveId,
      body: taskBody,
    }).unwrap();
    handleProjectIsActive(false);
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
                  updateModalActive={updateModalActive}
                  updateColumnActive={updateColumnActive}
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
      {isProjectModalActive && (
        <CreateProjectForm
          typeOfForm={'create_task'}
          updateState={handleProjectIsActive}
          callbackTaskToSubmit={callbackToSubmit}
        />
      )}
    </section>
  );
};

export default ProjectPage;
