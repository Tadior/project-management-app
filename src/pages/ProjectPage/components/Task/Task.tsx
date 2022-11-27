import { useState } from 'react';
import magicPenIcon from '../../../../assets/icons/stick_icon-small.png';
import trashIcon from '../../../../assets/icons/trash_task.png';
import checkbox from '../../../../assets/icons/checkbox.svg';
import DeleteModal from '../../../../components/DeleteModal/DeleteModal';
import {
  useDeleteTaskByIdMutation,
  useUpdateTaskByIdMutation,
  useUpdateTasksSetMutation,
} from '../../../../redux/query/TasksQuery';
import {
  columnApi,
  columnApiWithTasks,
  ICreateForm,
  TaskApi,
  updateTaskByIdBody,
} from '../../../../types/types';
import { CreateProjectForm } from '../../../../components/CreateProjectForm/CreateProjectForm';
import { SubmitHandler } from 'react-hook-form';
import { store } from '../../../../App';
import { getCookie, getUserCookie } from '../../../../helper/Helper';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { setCurrentColumn, setCurrentTask } from '../../../../redux/reducer/ProjectSlice';
interface IProps {
  // Стейт со всеми колонками и тасками
  columnsList: columnApiWithTasks[];
  // Колонка
  columnData: columnApiWithTasks;
  taskData: TaskApi;
  callbackDelete: (taskId: string) => void;
  updateColumnsData: (newColumns: columnApiWithTasks[]) => void;
}
const Task = (props: IProps) => {
  const { currentColumn, currentTask } = useAppSelector((state) => state.ProjectSlice);
  const { isCurrentColumn } = useAppSelector((state) => state.ColumnSlice);
  const dispatch = useAppDispatch();
  // const [currentTask, setCurrentTask] = useState({
  //   _id: '',
  //   title: '',
  //   order: 0,
  //   boardId: '',
  //   columnId: '',
  //   description: '',
  //   userId: '',
  //   users: [''],
  // });
  // const [currentColumn, setCurrentColumn] = useState({
  //   _id: '',
  //   boardId: '',
  //   title: '',
  //   order: 0,
  //   tasks: [
  //     {
  //       _id: '',
  //       title: '',
  //       order: 0,
  //       boardId: '',
  //       columnId: '',
  //       description: '',
  //       userId: '',
  //       users: [''],
  //     },
  //   ],
  // });
  const [updateTask, updateTaskData] = useUpdateTaskByIdMutation();
  const [updateTaskSet, updateTaskSetData] = useUpdateTasksSetMutation();
  const [isDeleteActive, setIsDeleteActive] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);
  const { _id, login } = getUserCookie();
  const activeProjectId = getCookie('projectId')!;
  const closeDeleteModal = () => {
    setIsDeleteActive(!isDeleteActive);
  };
  const deleteTask = () => {
    props.callbackDelete(props.taskData._id);
    closeDeleteModal();
  };
  const updateTaskCallback: SubmitHandler<ICreateForm> = async (arg) => {
    const taskBody: updateTaskByIdBody = {
      columnId: props.columnData._id,
      title: arg.title,
      order: props.taskData.order,
      description: arg.text,
      userId: _id,
      users: [login],
    };
    updateTask({
      boardId: activeProjectId,
      columnId: props.columnData._id,
      taskId: props.taskData._id,
      body: taskBody,
    });
    handleEdit();
  };
  const handleEdit = () => {
    setIsModalActive(!isModalActive);
  };
  const dragStartHandler = (
    event: React.DragEvent<HTMLLIElement>,
    column: columnApiWithTasks,
    task: TaskApi
  ) => {
    dispatch(setCurrentColumn(column));
    dispatch(setCurrentTask(task));
    // setCurrentColumn(column);
    // setCurrentTask(task);
  };
  const dragLeaveHandler = (event: React.DragEvent<HTMLLIElement>) => {
    // props.updateCurrentColumn(column);
    const target = event.target as HTMLLIElement;
    if (target.classList.contains(`task_active`)) {
      target.classList.remove('task_active');
    }
  };

  const dragEndHandler = (event: React.DragEvent<HTMLLIElement>) => {
    const target = event.target as HTMLLIElement;
    if (target.classList.contains(`task_active`)) {
      target.classList.remove('task_active');
    }
  };

  const dragOverHandler = (event: React.DragEvent<HTMLLIElement>) => {
    event.preventDefault();
    const target = event.target as HTMLLIElement;
    if (target.classList.contains(`task`)) {
      target.classList.add('task_active');
    }
  };
  const updatePreviousTasks = (column: columnApiWithTasks, lastIndex: number) => {
    const body = column.tasks.filter((item, index) => {
      if (index < lastIndex) {
        return false;
      }
      return true;
    });
    const updateBody = body.map((item) => {
      return {
        _id: item._id,
        order: item.order - 1,
        columnId: column._id,
      };
    });
    console.log(updateBody);
    try {
      updateTaskSet({ body: updateBody });
    } catch (error) {
      throw error;
    }
  };

  const updatePortableTasks = (column: columnApiWithTasks, task: TaskApi) => {
    const startIndex = column.tasks.indexOf(currentTask) + 1;
    const body = column.tasks.filter((item, index) => {
      if (index < startIndex) {
        return false;
      }
      return true;
    });
    const updateBody = body.map((item) => {
      return {
        _id: item._id,
        order: item.order + 1,
        columnId: column._id,
      };
    });
    updateBody.push({
      _id: currentTask._id,
      order: task.order + 1,
      columnId: task.columnId,
    });
    try {
      updateTaskSet({ body: updateBody });
    } catch (error) {
      throw error;
    }
  };

  const dropHandler = async (
    event: React.DragEvent<HTMLLIElement>,
    column: columnApiWithTasks,
    task: TaskApi
  ) => {
    event.preventDefault();
    event.stopPropagation();
    const target = event.target as HTMLDivElement;
    if (target.classList.contains(`task_active`)) {
      target.classList.remove('task_active');
    }
    console.log(isCurrentColumn);
    console.log(target);
    if (isCurrentColumn === false) {
      const currentColumnData: columnApiWithTasks = JSON.parse(JSON.stringify(currentColumn));
      const columnClone: columnApiWithTasks = JSON.parse(JSON.stringify(column));
      let columnIdToUpdate = '';

      const currentIndex = currentColumnData.tasks.findIndex((element: TaskApi) => {
        if (element._id === currentTask._id) {
          return true;
        }
        return false;
      });
      currentColumnData.tasks.splice(currentIndex, 1);

      const dropIndex = columnClone.tasks.findIndex((element: TaskApi) => {
        if (element._id === task._id) {
          return true;
        }
        return false;
      });
      const dropIndex1 = columnClone.tasks.findIndex((element: TaskApi) => {
        if (element._id === currentTask._id) {
          return true;
        }
        return false;
      });
      //====================================================================================
      if (currentColumn._id === columnClone._id) {
        columnClone.tasks.splice(dropIndex1, 1);
        columnClone.tasks.splice(dropIndex, 0, currentTask);
        columnIdToUpdate = currentColumn._id;
      } else {
        columnClone.tasks.splice(dropIndex + 1, 0, currentTask);
        columnIdToUpdate = columnClone._id;
      }

      const out = props.columnsList.map((col) => {
        if (col._id === columnClone._id) {
          return columnClone;
        }
        if (col._id === currentColumnData._id) {
          return currentColumnData;
        }
        return col;
      });
      // await props.callbackDelete(currentTask._id);
      // updateTask({
      //   boardId: currentTask.boardId,
      //   columnId: currentTask.columnId,
      //   taskId: currentTask._id,
      //   body: {
      //     columnId: columnIdToUpdate,
      //     title: currentTask.title,
      //     order: task.order + 1,
      //     description: currentTask.description,
      //     userId: currentTask.userId,
      //     users: currentTask.users,
      //   },
      // });
      if (currentTask.columnId === columnClone._id) {
        console.log('THAt');
        console.log(columnClone);
        const startIndex = columnClone.tasks.indexOf(task);
        const body = column.tasks.filter((item, index) => {
          if (index < startIndex) {
            return false;
          }
          return true;
        });
        const updateBody = body.map((item) => {
          return {
            _id: item._id,
            order: item.order + 1,
            columnId: column._id,
          };
        });
        updateBody.push({
          _id: currentTask._id,
          order: task.order,
          columnId: currentTask.columnId,
        });
        try {
          updateTaskSet({ body: updateBody });
        } catch (error) {
          throw error;
        }
        // updateTaskSet({
        //   body: [
        //     { _id: currentTask._id, order: task.order, columnId: currentTask.columnId },
        //     { _id: task._id, order: task.order + 1, columnId: task.columnId },
        //   ],
        // });
      } else {
        // task - на что навелся
        updatePreviousTasks(currentColumnData, currentIndex);
        updatePortableTasks(columnClone, task);

        // console.log('Body', body);
        // console.log('Update', updateBody);
        console.log('Clone', columnClone);
        console.log('Currentcolumn', currentColumnData);
        console.log('NOooooooooo');
      }
      console.log('target', task);
      console.log('target', target);
      // console.log('currentColumn', currentTask);
      console.log('id', columnIdToUpdate);
      console.log('---------------------------------');
      props.updateColumnsData(out);
    }
    // dispatch(
    //   setCurrentTask({
    //     _id: '',
    //     title: '',
    //     order: 0,
    //     boardId: '',
    //     columnId: '',
    //     description: '',
    //     userId: '',
    //     users: [],
    //   })
    // );
  };

  return (
    <li
      draggable={true}
      onDragOver={(event) => dragOverHandler(event)}
      onDragLeave={(event) => dragLeaveHandler(event)}
      onDragStart={(event) => dragStartHandler(event, props.columnData, props.taskData)}
      onDragEnd={(event) => dragEndHandler(event)}
      onDrop={(event) => dropHandler(event, props.columnData, props.taskData)}
      id={props.taskData._id}
      className="task"
    >
      <div className="task__checkbox">
        <label htmlFor="checkbox">
          <img src={checkbox} alt="task checkbox" />
        </label>
        <input className="task__checkbox-input" type="checkbox" name="" id="checkbox" />
      </div>
      <div className="task__info">
        <div className="task__title">{props.taskData.title}</div>
        <div className="task__description">{props.taskData.description}</div>
      </div>
      <div className="task__buttons">
        <button className="task__button" onClick={handleEdit}>
          <img className="task__button-icon" src={magicPenIcon} alt="magic pen" />
        </button>
        <button className="task__button" onClick={closeDeleteModal}>
          <img className="task__button-icon" src={trashIcon} alt="Delete task" />
        </button>
      </div>
      {isDeleteActive && <DeleteModal callbackDelete={deleteTask} closeModal={closeDeleteModal} />}
      {isModalActive && (
        <CreateProjectForm
          defaultData={{ title: props.taskData.title, text: props.taskData.description }}
          typeOfForm="task_edit"
          updateState={handleEdit}
          callbackTaskToSubmit={updateTaskCallback}
        />
      )}
    </li>
  );
};

export default Task;
