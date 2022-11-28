import { NavMenu } from '../NavMenu/NavMenu';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Burger } from '../Burger/Burger';
import { Logo } from '../Logo/Logo';

export const Header = () => {
  const languageRef = useRef<HTMLSpanElement>(null);
  const { i18n, t } = useTranslation();
  const handleChangeLang = () => {
    if (languageRef!.current!.innerHTML === 'EN') {
      i18n.changeLanguage('ru');
    } else {
      i18n.changeLanguage('en');
    }
  };
  return (
    <header className="header">
      <div className="header__wrapper container">
        <Link to="/">
          <Logo />
        </Link>
        <div className="menu-lang__wrapper">
          <NavMenu />
          <div onClick={handleChangeLang} className="lang en">
            <img className="lang__img" src="icons/lang.svg"></img>
            <span ref={languageRef} className="lang__text">
              {t('header_lang')}
            </span>
          </div>
          <Burger />
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
