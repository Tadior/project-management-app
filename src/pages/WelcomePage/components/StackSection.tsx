import React from 'react';
import { STACK } from '../constants';
import TeamCard from './TeamCard';
import { useTranslation } from 'react-i18next';

const StackSection = () => {
  const { t } = useTranslation();
  return (
    <section className="stack">
      <div className="container">
        <h3 className="stack__title section-title">{t('welcome_stack_title')}</h3>
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
