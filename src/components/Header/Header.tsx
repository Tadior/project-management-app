import { Menu } from '../NavMenu/NavMenu';

export const Header = () => {
  return (
    <header className="header">
      <div className="header__wrapper">
        <div className="logo">
          <img className="logo__img" src="logo.jpeg" alt="logo" />
          <p className="logo__text">
            Mana <br /> Projects
          </p>
        </div>
        <div className="menu-lang__wrapper">
          <Menu />
          <div className="lang">
            <img className="lang__img" src="lang.svg"></img>
            <span className="lang__text">En</span>
          </div>
        </div>
      </div>
    </header>
  );
};
