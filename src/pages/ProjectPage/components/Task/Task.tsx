import { useState } from 'react';
import { ReactComponent as MagicPenIcon } from '../../../../assets/icons/stick_icon-small.svg';
import { ReactComponent as TrashIcon } from '../../../../assets/icons/trash_task.svg';
import checkbox from '../../../../assets/icons/checkbox.svg';
import DeleteModal from '../../../../components/DeleteModal/DeleteModal';
import {
  useUpdateTaskByIdMutation,
  useUpdateTasksSetMutation,
} from '../../../../redux/query/TasksQuery';
import {
  columnApiWithTasks,
  ICreateForm,
  TaskApi,
  updateTaskByIdBody,
} from '../../../../types/types';
import { CreateProjectForm } from '../../../../components/CreateProjectForm/CreateProjectForm';
import { SubmitHandler } from 'react-hook-form';
import { getCookie, getUserCookie } from '../../../../helper/Helper';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { setCurrentColumn, setCurrentTask } from '../../../../redux/reducer/ProjectSlice';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const { currentColumn, currentTask } = useAppSelector((state) => state.ProjectSlice);
  const { isCurrentColumn } = useAppSelector((state) => state.ColumnSlice);
  const dispatch = useAppDispatch();
  const [updateTask, updateTaskData] = useUpdateTaskByIdMutation();
  const [updateTaskSet, updateTaskSetData] = useUpdateTasksSetMutation();
  const [isDeleteActive, setIsDeleteActive] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);
  const { _id } = getUserCookie();
  const activeProjectId = getCookie('projectId')!;
  const closeDeleteModal = () => {
    setIsDeleteActive(!isDeleteActive);
  };
  const deleteTask = () => {
    try {
      const index = props.columnData.tasks.indexOf(props.taskData);
      const updatedColumn: columnApiWithTasks = JSON.parse(JSON.stringify(props.columnData));
      const startIndex = updatedColumn.tasks.findIndex((task) => {
        if (task._id === props.taskData._id) {
          return true;
        }
      });
      const body = updatedColumn.tasks.filter((item, index) => {
        if (index < startIndex + 1) {
          return false;
        }
        return true;
      });
      const updateBody = body.map((item) => {
        return {
          _id: item._id,
          order: item.order - 1,
          columnId: updatedColumn._id,
        };
      });
      try {
        updateTaskSet({ body: updateBody });
      } catch (error) {
        toast(t('setData_error'), {
          containerId: 'error',
        });
      }
      updatedColumn.tasks.splice(index, 1);
      const out = props.columnsList.map((column) => {
        if (column._id === updatedColumn._id) {
          return updatedColumn;
        }
        return column;
      });
      props.updateColumnsData(out);
      props.callbackDelete(props.taskData._id);
      closeDeleteModal();
      toast(t('deleteTask_success'), {
        containerId: 'success',
      });
    } catch (error) {
      toast(t('setData_error'), {
        containerId: 'error',
      });
    }
  };
  const updateTaskCallback: SubmitHandler<ICreateForm> = async (arg) => {
    const taskBody: updateTaskByIdBody = {
      columnId: props.columnData._id,
      title: arg.title,
      order: props.taskData.order,
      description: arg.text,
      userId: _id,
      users: props.taskData.users,
    };
    updateTask({
      boardId: activeProjectId,
      columnId: props.columnData._id,
      taskId: props.taskData._id,
      body: taskBody,
    });
    const columnClone: columnApiWithTasks = JSON.parse(JSON.stringify(props.columnData));
    const index = props.columnData.tasks.indexOf(props.taskData);
    const currentColumnIndex = props.columnsList.indexOf(props.columnData);
    const currentColumn = props.columnsList[currentColumnIndex];
    const currentTaskIndex = currentColumn.tasks.indexOf(props.taskData);
    const currentOrder = currentColumn.tasks[currentTaskIndex].order;
    const updatedTask = {
      boardId: activeProjectId,
      columnId: props.columnData._id,
      description: arg.text,
      order: props.taskData.order,
      title: arg.title,
      userId: _id,
      users: props.taskData.users,
      _id: props.taskData._id,
    };
    columnClone.tasks.splice(index, 1, updatedTask);
    const sortedColumns = props.columnsList.map((column) => {
      if (column._id === props.columnData._id) {
        return columnClone;
      }
      return column;
    });
    props.updateColumnsData(sortedColumns);
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
      if (currentTask.columnId === columnClone._id) {
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
      } else {
        updatePreviousTasks(currentColumnData, currentIndex);
        updatePortableTasks(columnClone, task);
      }
      props.updateColumnsData(out);
    }
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
          <MagicPenIcon />
        </button>
        <button className="task__button" onClick={closeDeleteModal}>
          <TrashIcon />
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
