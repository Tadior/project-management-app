import { Navigate, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { getCookieToken } from '../../helper/Helper';
import { useAppSelector } from '../../hooks/redux';
import { useTranslation } from 'react-i18next';

export const NavMenu = () => {
  const { pathname } = useLocation();
  // const { userData } = useAppSelector((state) => state.userReducer);
  const isUser = getCookieToken();

  const { userData } = useAppSelector((state) => state.userReducer);
  const { t } = useTranslation();
  return (
    <nav className="menu">
      {isUser ? (
        <>
          <NavLink className="link-project button-black" to="projects">
            {pathname === '/' ? 'Go to main page' : 'projects'}
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
