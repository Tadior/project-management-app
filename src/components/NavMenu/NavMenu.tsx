import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { deleteCookie, getCookie } from '../../helper/Helper';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setBurgerStatus } from '../../redux/reducer/UserSlice';
export const NavMenu = () => {
  const { isBurgerOpen } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const isUser = getCookie('token');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleCloseBurger = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    if (!target.classList.contains('menu')) {
      dispatch(setBurgerStatus(false));
    }
  };

  const signOut = () => {
    deleteCookie('token');
    deleteCookie('userData');
    navigate('/');
  };
  return (
    <nav className={isBurgerOpen ? 'menu active' : 'menu'} onClick={handleCloseBurger}>
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
