import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ExampleSlice } from '../../redux/reducer/ExampleSlice';
// import './Example.scss';
const Example = () => {
  const { lastName, firstName, age, count } = useAppSelector((state) => state.ExampleReducer);
  const { increment } = ExampleSlice.actions;
  const dispatch = useAppDispatch();

  return (
    <div className="example">
      <div className="example__container">
        <div className="example__content">{count}</div>
        <button onClick={() => dispatch(increment(1))}>Click</button>
      </div>
    </div>
  );
};

export default Example;
