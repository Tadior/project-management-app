import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const NavMenu = () => {
  const { t } = useTranslation();
  const user = false;
  return (
    <nav className="menu">
      {user ? (
        <>
          <NavLink className="link-project button-black" to="Projects">
            {t('header_projects')}
          </NavLink>
          <button className="link-signOut button-black">{t('header_signOut')}</button>
        </>
      ) : (
        <>
          <NavLink className="link-signIn button-black" to="signIn">
            {t('header_signIn')}
          </NavLink>
          <NavLink className="link-signUp button-black" to="signUp">
            {t('header_signUp')}
          </NavLink>
        </>
      )}
    </nav>
  );
};
