import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header/Header';
import { Menu } from '../components/NavMenu/NavMenu';

export const MainLayouts = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer>rss 2022</footer>
    </>
  );
};
