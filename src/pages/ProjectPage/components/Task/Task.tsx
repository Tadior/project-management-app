import { useState } from 'react';
import magicPenIcon from '../../../../assets/icons/stick_icon-small.png';
import trashIcon from '../../../../assets/icons/trash_task.png';
import checkbox from '../../../../assets/icons/checkbox.svg';
import DeleteModal from '../../../../components/DeleteModal/DeleteModal';
import { useUpdateTaskByIdMutation } from '../../../../redux/query/TasksQuery';
import { ICreateForm, TaskApi, updateTaskByIdBody } from '../../../../types/types';
import { CreateProjectForm } from '../../../../components/CreateProjectForm/CreateProjectForm';
import { SubmitHandler } from 'react-hook-form';
import { store } from '../../../../App';
interface IProps {
  columnId: string;
  data: TaskApi;
  callbackDelete: (taskId: string) => void;
}
const Task = (props: IProps) => {
  const [isDeleteActive, setIsDeleteActive] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);
  const [updateTask, updateTaskData] = useUpdateTaskByIdMutation();
  const { _id, login } = store.getState().userReducer.userData;
  const { activeProjectId } = store.getState().userReducer;
  const closeDeleteModal = () => {
    setIsDeleteActive(!isDeleteActive);
  };
  const deleteTask = () => {
    props.callbackDelete(props.data._id);
    closeDeleteModal();
  };
  const updateTaskCallback: SubmitHandler<ICreateForm> = async (arg) => {
    const taskBody: updateTaskByIdBody = {
      columnId: props.columnId,
      title: arg.title,
      order: props.data.order,
      description: arg.text,
      userId: _id,
      users: [login],
    };
    updateTask({
      boardId: activeProjectId,
      columnId: props.columnId,
      taskId: props.data._id,
      body: taskBody,
    });
    handleEdit();
  };
  const handleEdit = () => {
    setIsModalActive(!isModalActive);
  };

  return (
    <li id={props.data._id} className="task">
      <div className="task__checkbox">
        <label htmlFor="checkbox">
          <img src={checkbox} alt="task checkbox" />
        </label>
        <input className="task__checkbox-input" type="checkbox" name="" id="checkbox" />
      </div>
      <div className="task__info">
        <div className="task__title">{props.data.title}</div>
        <div className="task__description">{props.data.description}</div>
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
          defaultData={{ title: props.data.title, text: props.data.description }}
          typeOfForm="task_edit"
          updateState={handleEdit}
          callbackTaskToSubmit={updateTaskCallback}
        />
      )}
    </li>
  );
};

export default Task;
