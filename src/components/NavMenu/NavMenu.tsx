import React from 'react';
import { NavLink } from 'react-router-dom';

export const Menu = () => {
  return (
    <nav className="menu">
      {/* <NavLink to="." end>
        Home
      </NavLink> */}
      <NavLink className="link-signIn button-black" to="signIn">
        sign in
      </NavLink>
      <NavLink className="link-signOut button-black" to="signOut">
        sign out
      </NavLink>
    </nav>
  );
};
