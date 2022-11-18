import React from 'react';
interface IProps {
  title: string;
}

const Column = (props: IProps) => {
  return (
    <div className="column">
      <div className="column__header">
        <div className="column__title">{props.title}</div>
        <button className="btn btn__column"></button>
      </div>
      <div className="column__content"></div>
    </div>
  );
};

export default Column;
