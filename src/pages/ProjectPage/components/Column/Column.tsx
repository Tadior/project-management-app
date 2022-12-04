import React, { useRef, useState } from 'react';
import trashIcon from '../../../../assets/icons/trash_icon.png';
import DeleteModal from '../../../../components/DeleteModal/DeleteModal';
import { columnApi, createColumnApi, TaskApi } from '../../../../types/types';
import { useUpdateColumnByIdMutation } from '../../../../redux/query/ColumnsQuery';
import { columnApiWithTasks } from '../../../../types/types';
import Task from '../Task/Task';
import {
  useDeleteTaskByIdMutation,
  useUpdateTaskByIdMutation,
} from '../../../../redux/query/TasksQuery';
import { ReactComponent as BackIcon } from '../../../../assets/icons/back.svg';
import { ReactComponent as CheckIcon } from '../../../../assets/icons/check.svg';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { setIsCurrentColumn } from '../../../../redux/reducer/ColumnSlice';
import { setCurrentTask } from '../../../../redux/reducer/ProjectSlice';
interface IProps {
  columnData: columnApiWithTasks[];
  data: columnApiWithTasks;
  projectId: string;
  updateColumnsData: (newColumns: columnApiWithTasks[]) => void;
  deleteCallback: (colimnId: string) => void;
  updateColumnsCallback: (columnItem: columnApi) => void;
  updateCurrentColumn: (column: columnApiWithTasks) => void;
  updateModalActive: () => void;
  updateColumnActive: (id: string) => void;
  updateColumnCreate: (value: columnApiWithTasks) => void;
}

const Column = (props: IProps) => {
  const [isDeleteActive, setIsDeleteActive] = useState(false);
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [title, setTitle] = useState(props.data.title);
  const [isEditMode, setIsEditMode] = useState(false);
  const { currentColumn, currentTask } = useAppSelector((state) => state.ProjectSlice);
  const dispatch = useAppDispatch();
  const [updateColumn, columnData] = useUpdateColumnByIdMutation();
  const [deleteTask, deleteTaskData] = useDeleteTaskByIdMutation();
  const [updateTask, updateTaskData] = useUpdateTaskByIdMutation();
  const callbackDelete = (taskId: string) => {
    deleteTask({ boardId: props.projectId, columnId: props.data._id, taskId: taskId });
  };

  const deleteColumn = (colimnId: string) => {
    props.deleteCallback(colimnId);
    setIsDeleteActive(false);
  };

  const closeModalCallback = () => {
    setIsDeleteActive(false);
  };

  const changeEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const updateValue = () => {
    const body: createColumnApi = {
      title: inputRef.current.value,
      order: props.data.order,
    };
    updateColumn({ boardId: props.projectId, columnId: props.data._id, body: body });
    setTitle(inputRef.current.value);
    changeEditMode();
  };

  const renderEditView = () => {
    return (
      <>
        <input className="column__input" type="text" defaultValue={title} ref={inputRef} />
        <button onClick={changeEditMode}>
          <BackIcon />
        </button>
        <button onClick={updateValue}>
          <CheckIcon />
        </button>
      </>
    );
  };
  // Срабатывает при клике на Add task
  const handleClickAdd = () => {
    props.updateColumnActive(props.data._id);
    props.updateModalActive();
    props.updateColumnCreate(props.data);
  };

  const dragStartHandler = (event: React.DragEvent<HTMLDivElement>, column: columnApiWithTasks) => {
    props.updateCurrentColumn(column);
    event.stopPropagation();
    const target = event.target as HTMLDivElement;
    if (!target.classList.contains('task')) {
      dispatch(setIsCurrentColumn(true));
    }
  };

  const dragEndHandler = (event: React.DragEvent<HTMLDivElement>) => {
    const target = event.currentTarget as HTMLDivElement;
    if (target.classList.contains(`column_active`)) {
      target.classList.remove('column_active');
    }
  };

  const dragOverHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const target = event.currentTarget as HTMLDivElement;
    if (target.classList.contains(`column`)) {
      target.classList.add('column_active');
    }
  };

  const dropHandler = (event: React.DragEvent<HTMLDivElement>, column: columnApiWithTasks) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(setIsCurrentColumn(false));
    const target = event.currentTarget as HTMLDivElement;
    if (target.classList.contains(`column_active`)) {
      target.classList.remove('column_active');
    }
    if (currentTask._id && !column.tasks.includes(currentTask)) {
      column.tasks.push(currentTask);
      const currentColumnData: columnApiWithTasks = JSON.parse(JSON.stringify(currentColumn));
      const currentIndex = currentColumnData.tasks.findIndex((element: TaskApi) => {
        if (element._id === currentTask._id) {
          return true;
        }
        return false;
      });
      currentColumnData.tasks.splice(currentIndex, 1);
      const out = props.columnData.map((col) => {
        if (col._id === column._id) {
          return column;
        }
        if (col._id === currentColumnData._id) {
          return currentColumnData;
        }
        return col;
      });
      props.updateColumnsData(out);
      updateTask({
        boardId: props.projectId,
        columnId: currentTask.columnId,
        taskId: currentTask._id,
        body: {
          columnId: column._id,
          title: currentTask.title,
          order: props.data.tasks.length - 1,
          description: currentTask.description,
          userId: currentTask.userId,
          users: currentTask.users,
        },
      });
    } else {
      props.updateColumnsCallback(column);
    }
    // Сбрасываем информацио о активном таске
    dispatch(
      setCurrentTask({
        _id: '',
        title: '',
        order: 0,
        boardId: '',
        columnId: '',
        description: '',
        userId: '',
        users: [],
      })
    );
  };

  return (
    <div
      className="column"
      id={props.data._id}
      draggable={true}
      onDragStart={(event) => dragStartHandler(event, props.data)}
      onDragLeave={(event) => dragEndHandler(event)}
      onDragEnd={(event) => dragEndHandler(event)}
      onDragOver={(event) => dragOverHandler(event)}
      onDrop={(event) => dropHandler(event, props.data)}
    >
      <div className="column__header">
        {isEditMode ? (
          renderEditView()
        ) : (
          <div className="column__title" onClick={changeEditMode}>
            {title}
          </div>
        )}
        <button className="btn btn__column" onClick={handleClickAdd}>
          + Add Task
        </button>
      </div>
      <div className="column__content">
        {props.data.tasks &&
          props.data.tasks.map((task) => (
            <Task
              updateColumnsData={props.updateColumnsData}
              columnsList={props.columnData}
              columnData={props.data}
              taskData={task}
              callbackDelete={callbackDelete}
              key={task._id}
            />
          ))}
      </div>
      <button
        className="column__delete"
        onClick={() => {
          setIsDeleteActive(true);
        }}
      >
        <img src={trashIcon} alt="Delete column" />
      </button>
      {isDeleteActive && (
        <DeleteModal
          callbackDelete={() => deleteColumn(props.data._id)}
          closeModal={closeModalCallback}
        />
      )}
    </div>
  );
};

export default Column;
