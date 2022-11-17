import React from 'react';
import MagicBtn from './magicBtn';
import { useTranslation } from 'react-i18next';

const CreationSection = () => {
  const { t } = useTranslation();
  return (
    <section className="creation">
      <div className="container">
        <h3 className="creation__title section-title">{t('welcome_creation_title')}</h3>
        <div className="creation__content">
          <div className="creation__img"></div>
          <div className="creation__info">
            <p className="creation__info-text section-text">{t('welcome_creation_text')}</p>
            <MagicBtn href="https://rs.school/react/" text={t('welcome_creation_btn')} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreationSection;
