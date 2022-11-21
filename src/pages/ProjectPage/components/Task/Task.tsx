import React from 'react';
import magicPenIcon from '../../../../assets/icons/stick_icon-small.png';
import trashIcon from '../../../../assets/icons/trash_task.png';

const Task = () => {
  return (
    <li className="task">
      <div className="task__checkbox"></div>
      <div className="task__info">
        <div className="task__title"></div>
        <div className="task__description"></div>
      </div>
      <div className="task__buttons">
        <button className="task__button">
          <img src={magicPenIcon} alt="magic pen" />
        </button>
        <button className="task__button">
          <img src={trashIcon} alt="Delete task" />
        </button>
      </div>
    </li>
  );
};

export default Task;
