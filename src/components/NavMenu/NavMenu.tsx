import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { useTranslation } from 'react-i18next';

export const NavMenu = () => {
  const { userData } = useAppSelector((state) => state.userReducer);
  const { t } = useTranslation();
  return (
    <nav className="menu">
      {userData._id ? (
        <>
          <NavLink className="link-project button-black" to="Projects">
            {t('header_projects')}
          </NavLink>
          <button className="link-signOut button-black">{t('header_signOut')}</button>
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
