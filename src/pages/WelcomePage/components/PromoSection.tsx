import React from 'react';
import MagicBtn from './magicBtn';
import Wizard from '../../../assets/images/welcome_image.png';
import { useTranslation } from 'react-i18next';
import { getCookie } from '../../../helper/Helper';

const PromoSection = () => {
  const { t } = useTranslation();
  const token = getCookie('token');
  return (
    <section className="promo">
      <div className="container">
        <div className="promo__info">
          <h1 className="promo__info-title">
            {t('welcome_promo_title_p1')}
            <br />
            {t('welcome_promo_title_p2')}
          </h1>
          <p className="promo__info-details section-text">{t('welcome_promo_text')}</p>
          <MagicBtn to={token ? '/projects' : '/signUp'} text={t('welcome_promo_btn')} />
        </div>
        <img src={Wizard} className="promo__img" alt="Wizard" />
      </div>
    </section>
  );
};

export default PromoSection;
