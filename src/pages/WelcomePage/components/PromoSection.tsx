import React from 'react';
import MagicBtn from './magicBtn';

const PromoSection = () => {
  return (
    <section className="promo">
      <div className="container">
        <div className="promo__info">
          <h1 className="promo__info-title">
            Your Magic
            <br />
            Projects Manager
          </h1>
          <p className="promo__info-details">
            Plan, organize and collaborate on any project with powerful projects management that can
            be customized to suit your needs. Mana Projects is a handy web application that will
            make even the most complex project magically simple.
          </p>
          <MagicBtn text="Start magic" />
        </div>
        <div className="promo__img"></div>
      </div>
    </section>
  );
};

export default PromoSection;
