import { NavLink, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';

export const NavMenu = () => {
  const { userData } = useAppSelector((state) => state.userReducer);
  const isUser = userData._id;
  const { pathname } = useLocation();

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
