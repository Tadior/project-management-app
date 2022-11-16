import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';

export const NavMenu = () => {
  const { userData } = useAppSelector((state) => state.userReducer);

  return (
    <nav className="menu">
      {userData._id ? (
        <>
          <NavLink className="link-project button-black" to="Projects">
            projects
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
