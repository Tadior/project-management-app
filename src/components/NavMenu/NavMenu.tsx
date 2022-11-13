import React from 'react';
import { NavLink } from 'react-router-dom';

export const NavMenu = () => {
  const user = false;
  return (
    <nav className="menu">
      {user ? (
        <>
          <NavLink className="link-project button-black" to="Projects">
            projects
          </NavLink>
          <NavLink className="link-signOut button-black" to="signOut">
            sign out
          </NavLink>
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
