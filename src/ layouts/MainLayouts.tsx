import React from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from '../components/Menu/Menu';

export const MainLayouts = () => {
  return (
    <>
      <header>
        <Menu />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>rss 2022</footer>
    </>
  );
};
