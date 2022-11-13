import React from 'react';
import MagicBtn from './magicBtn';
import Wizard from '../../../assets/images/welcome_image.png';

const PromoSection = () => {
  return (
    <section className="promo">
      <div className="container">
        <div className="promo__info">
          <h1 className="promo__info-title">Your Magic Projects Manager</h1>
          <p className="promo__info-details section-text">
            Plan, organize and collaborate on any project with powerful projects management that can
            be customized to suit your needs. Mana Projects is a handy web application that will
            make even the most complex project magically simple.
          </p>
          <MagicBtn to="/signUp" text="Start magic" />
        </div>
        <img src={Wizard} className="promo__img" alt="Wizard" />
      </div>
    </section>
  );
};

export default PromoSection;
