import React from 'react';
import crossWhiteImage from '../../../../assets/icons/cross_white.png';

interface IProps {
  updateModalState: () => void;
}

const NewColumnBtn = (props: IProps) => {
  const handleClick = () => {
    props.updateModalState();
  };
  return (
    <button className="new-column-btn" onClick={handleClick}>
      <img src={crossWhiteImage} alt="Add new column" className="new-column-btn__img" />
    </button>
  );
};

export default NewColumnBtn;
