import React from 'react';
import MagicBtn from './magicBtn';

const CreationSection = () => {
  return (
    <section className="creation">
      <div className="container">
        <h3 className="creation__title section-title">App creation</h3>
        <div className="creation__content">
          <div className="creation__img"></div>
          <div className="creation__info">
            <p className="creation__info-text section-text">
              This application was created by a small group of developers as part of The Rolling
              Scopes School&apos;s React course. RSSchool is free-of-charge and community-based
              education program conducted by The Rolling Scopes developer community since 2013.
              Everyone can study at RSSchool, regardless of age, professional employment, or place
              of residence.
            </p>
            <MagicBtn text="Join" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreationSection;
