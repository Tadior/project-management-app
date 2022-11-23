import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { deleteCookie, getCookie } from '../../helper/Helper';
import { useTranslation } from 'react-i18next';

export const NavMenu = () => {
  const { pathname } = useLocation();
  const isUser = getCookie('token');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const signOut = () => {
    deleteCookie('token');
    deleteCookie('userData');
    navigate('/');
  };
  return (
    <nav className="menu">
      {isUser ? (
        <>
          <NavLink className="link-project button-black" to="projects">
            {pathname === '/' ? t('go_to_main-page') : t('header_projects')}
          </NavLink>
          <button onClick={signOut} className="link-signOut button-black">
            {t('header_signOut')}
          </button>
          <NavLink className="link-profile" to="profile">
            <img className="lang__img" src="icons/user.svg" alt="user" />
          </NavLink>
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
