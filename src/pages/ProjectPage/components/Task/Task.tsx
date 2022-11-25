import { useState } from 'react';
import magicPenIcon from '../../../../assets/icons/stick_icon-small.png';
import trashIcon from '../../../../assets/icons/trash_task.png';
import checkbox from '../../../../assets/icons/checkbox.svg';
import DeleteModal from '../../../../components/DeleteModal/DeleteModal';
import { useUpdateTaskByIdMutation } from '../../../../redux/query/TasksQuery';
import {
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
  const dispatch = useAppDispatch();
  const [updateTask, updateTaskData] = useUpdateTaskByIdMutation();
  // console.log('Done', [...props.columnsList]);
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

  const dropHandler = (
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
    // Таски которые останутся в колонке переносимого таска
    const newTasks = currentColumn.tasks.filter((item) => item != currentTask);
    const currentIndex = currentColumn.tasks.indexOf(task);
    console.log(newTasks);
    const out = props.columnsList.map((element) => {
      // if (element._id === newTasks[0].columnId && element._id === currentColumn._id) {
      //   console.log('DONE');
      //   console.log('new', newTasks);
      //   console.log(task);
      // }
      if (element._id === currentColumn._id) {
        console.log('new', newTasks);
        return { ...element, tasks: newTasks };
      }
      if (element._id === column._id) {
        return { ...element, tasks: [...element.tasks, currentTask] };
      }
      return element;
    });

    props.updateColumnsData(out);
    console.log(newTasks);
    console.log(task);
    updateTask({
      boardId: task.boardId,
      columnId: task.columnId,
      taskId: currentTask._id,
      body: {
        columnId: task.columnId,
        title: currentTask.title,
        order: task.order + 1,
        description: currentTask.description,
        userId: currentTask.userId,
        users: currentTask.users,
      },
    });
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
