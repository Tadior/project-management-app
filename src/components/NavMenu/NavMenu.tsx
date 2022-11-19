import { Navigate, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { getCookieToken } from '../../helper/Helper';
import { useAppSelector } from '../../hooks/redux';

export const NavMenu = () => {
  const { pathname } = useLocation();
  // const { userData } = useAppSelector((state) => state.userReducer);
  const isUser = getCookieToken();

  return (
    <nav className="menu">
      {isUser ? (
        <>
          <NavLink className="link-project button-black" to="Projects">
            {pathname === '/' ? 'Go to main page' : 'projects'}
          </NavLink>
          <button className="link-signOut button-black">Sign out</button>
        </>
      ) : (
        <>
          <NavLink className="link-signIn button-black" to="signIn">
            Sign in
          </NavLink>
          <NavLink className="link-signUp button-black" to="signUp">
            Sign up
          </NavLink>
        </>
      )}
    </nav>
  );
};
