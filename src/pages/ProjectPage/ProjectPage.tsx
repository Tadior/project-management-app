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
import { getCookie, getUserCookie } from '../../helper/Helper';
import { TaskApi } from '../../types/types';
const initial: columnApiWithTasks = {
  title: '',
  order: 0,
  _id: '',
  boardId: '',
  tasks: [],
};
// const initialTask: TaskApi = {
//   _id: '',
//   title: '',
//   order: 0,
//   boardId: '',
//   columnId: '',
//   description: '',
//   userId: '',
//   users: [],
// };

const ProjectPage = () => {
  const loaderData = useLoaderData() as columnApiWithTasks[];
  const title = useParams().title;
  const projectId = getCookie('projectId')!;
  const { _id, login } = getUserCookie()!;
  const [currentColumn, setCurrentColumn] = useState(loaderData ? loaderData[0] : INITIAL_VALUE[0]);
  // const [currentColumnTask, setCurrentColumnTask] = useState(loaderData[0]);
  // const [currentTask, setCurrentTask] = useState(initialTask);
  const [isProjectModalActive, setisProjectModalActive] = useState(false);
  const [isColumnModalActive, setColumnModalActive] = useState(false);
  const [columnActiveId, setColumnActiveId] = useState('');
  const [columnCreateData, setColumnCreateData] = useState(initial);
  const [updateSetOfColumns, setOfColumnsData] = useUpdateColumnSetMutation();
  const [deleteColumnRequest, deleteColumnData] = useDeleteColumnByIdMutation();
  const [createTask, taskInfo] = useCreateTaskMutation();
  // Сортирует колонки по порядку, используется только в компоненте
  const sortColumns = (columns: columnApiWithTasks[]) => {
    return columns.sort((a, b) => {
      return a.order - b.order;
    });
  };
  // Обновляет стейт для отображения модалок, передается в NewColumnBtn и ColumnModal
  const handleProjectIsActive = (value: boolean) => {
    setisProjectModalActive(value);
  };
  // Хранит в себе все колонки с данными
  const [columns, setColumns] = useState(loaderData ? sortColumns(loaderData) : INITIAL_VALUE);

  // Обновляет стейт для отображения модалок, передается в NewColumnBtn и ColumnModal
  const columnModalCallback = (value: boolean) => {
    setColumnModalActive(value);
  };
  // Обновляет стейт с колонками, передается в ColumnModal
  const updateColumns = (newColumns: columnApiWithTasks[]) => {
    setColumns(newColumns);
  };
  // Используется как колбек для удаления колонки и обновления стейта с колонками, передается в Column
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
  // Колбек, меняет порядок колонок и обновляет данные на сервере, передается в Column
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
    console.log(currentColumn);
    console.log(columnItem);
    const requestBody: IColumnsBody[] = [
      { _id: columnItem._id, order: currentColumn.order },
      { _id: currentColumn._id, order: columnItem.order },
    ];
    updateSetOfColumns({ body: requestBody });
  };
  // Колбек, записывает в стейт текущую колонку при drag and drop, передается в Column
  const updateCurrentColumns = (column: columnApiWithTasks) => {
    setCurrentColumn(column);
  };
  // Колбек, записывает id колонки в которой нажали на Add task, передается в Column
  const updateColumnActive = (id: string) => {
    setColumnActiveId(id);
  };
  // Колбек, обновляет состояние модалки, передается в Column
  const updateModalActive = () => {
    setisProjectModalActive(!isProjectModalActive);
  };
  // Колбек, обновляет стейт с данными создаваемой колонки, передается в Column
  const updateColumnCreate = (value: columnApiWithTasks) => {
    setColumnCreateData(value);
  };
  //Колбек, создает новую задачу, передаеся в CreateProjectForm
  const callbackToSubmit: SubmitHandler<ICreateForm> = async (arg) => {
    const taskBody: ICreateTasksBody = {
      title: arg.title,
      order: columnCreateData.tasks.length ? columnCreateData.tasks.length : 0,
      description: arg.text,
      userId: _id,
      users: [login],
    };
    const newTask = await createTask({
      boardId: projectId,
      columnId: columnActiveId,
      body: taskBody,
    }).unwrap();
    const allColumns = [...columns];
    allColumns[allColumns.indexOf(columnCreateData)].tasks.push(newTask);
    setColumns(allColumns);
    handleProjectIsActive(false);
  };

  return (
    <section className="project-page">
      <div className="container project-page__container">
        <h2 className="title project-page__title">{title}</h2>
        <div className="project-page__wrapper">
          {columns &&
            // columns[0] &&
            columns.map((column) => {
              return (
                <Column
                  // Нужно для обновления колонок из Task
                  columnData={columns}
                  // Обновить все колонки
                  updateColumnsData={updateColumns}
                  data={column}
                  deleteCallback={deleteColumn}
                  projectId={projectId}
                  updateColumnsCallback={updateColumnsData}
                  updateCurrentColumn={updateCurrentColumns}
                  updateModalActive={updateModalActive}
                  updateColumnActive={updateColumnActive}
                  updateColumnCreate={updateColumnCreate}
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
