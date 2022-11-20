import { useRef, useState } from 'react';
import trashIcon from '../../../../assets/icons/trash_icon.png';
import DeleteModal from '../../../../components/DeleteModal/DeleteModal';
import { columnApi, createColumnApi } from '../../../../types/types';
import { useUpdateColumnByIdMutation } from '../../../../redux/query/ColumnsQuery';

interface IProps {
  data: columnApi;
  projectId: string;
  deleteCallback: (colimnId: string) => void;
  updateColumnsCallback: (columnItem: columnApi) => void;
  updateCurrentColumn: (column: columnApi) => void;
}

const Column = (props: IProps) => {
  const [isDeleteActive, setIsDeleteActive] = useState(false);
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [title, setTitle] = useState(props.data.title);
  const [isEditMode, setIsEditMode] = useState(false);
  const [updateColumn, columnData] = useUpdateColumnByIdMutation();

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
        <button onClick={changeEditMode}>Cancel</button>
        <button onClick={updateValue}>Submit</button>
      </>
    );
  };

  const dragStartHandler = (event: React.DragEvent<HTMLDivElement>, column: columnApi) => {
    props.updateCurrentColumn(column);
  };

  const dragEndHandler = (event: React.DragEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    if (target.classList.contains(`column_active`)) {
      target.classList.remove('column_active');
    }
  };

  const dragOverHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const target = event.target as HTMLDivElement;
    if (target.classList.contains(`column`)) {
      target.classList.add('column_active');
    }
  };

  const dropHandler = (event: React.DragEvent<HTMLDivElement>, column: columnApi) => {
    event.preventDefault();
    props.updateColumnsCallback(column);
    const target = event.target as HTMLDivElement;
    if (target.classList.contains(`column_active`)) {
      target.classList.remove('column_active');
    }
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
        <button className="btn btn__column">+ Add Task</button>
      </div>
      <div className="column__content"></div>
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
