import React from 'react';
import { useTranslation } from 'react-i18next';
import Frog from '../../assets/images/frog.png';

export const NotFound = () => {
  const { t } = useTranslation();
  return (
    <section className="not-found">
      <div className="container">
        <div className="not-found__details">
          <p className="not-found__details-text">{t('404_page')}</p>
          <button
            onClick={() => window.history.back()}
            className="not-found__details-btn button-black"
          >
            {t('back_btn')}
          </button>
        </div>
        <img className="not-found__img" src={Frog} alt="404-frog" />
      </div>
    </section>
  );
};
