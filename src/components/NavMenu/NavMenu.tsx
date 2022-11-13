import React from 'react';
import { NavLink } from 'react-router-dom';

export const Menu = () => {
  return (
    <nav className="menu">
      {/* <NavLink to="." end>
        Home
      </NavLink> */}
      <NavLink className="link-signIn button-black" to="signIn">
        Sign in
      </NavLink>
      <NavLink className="link-signUp button-black" to="signUp">
        Sign up
      </NavLink>
    </nav>
  );
};
