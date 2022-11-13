import React from 'react';
import { STACK } from '../constants';
import TeamCard from './TeamCard';

const StackSection = () => {
  return (
    <section className="stack">
      <div className="container">
        <h3 className="stack__title section-title">The Stack We Used</h3>
        <div className="stack__imgs">
          {STACK.map((item) => (
            <img key={item} src={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StackSection;
