import React from 'react';
import { NavLink } from 'react-router-dom';

export const Menu = () => {
  return (
    <nav>
      {/* <NavLink to="." end>
        Home
      </NavLink> */}
      <NavLink to="signIn">sign in</NavLink>
      <NavLink to="signOut">sign out</NavLink>
    </nav>
  );
};
