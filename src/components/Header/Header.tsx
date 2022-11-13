import { NavMenu } from '../NavMenu/NavMenu';
import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="header">
      <div className="header__wrapper container">
        <Link to="/">
          <div className="logo">
            <img className="logo__img" src="icons/logo.png" alt="logo" />
            <p className="logo__text">
              Mana <br /> Projects
            </p>
          </div>
        </Link>
        <div className="menu-lang__wrapper">
          <NavMenu />
          <div className="lang">
            <img className="lang__img" src="icons/lang.svg"></img>
            <span className="lang__text">EN</span>
          </div>
        </div>
      </div>
    </header>
  );
};

document.body.onscroll = () => {
  const header = document.querySelector('.header');
  if (window.scrollY > 0) {
    header?.classList.add('active-header');
  } else {
    header?.classList.remove('active-header');
  }
};
