export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-wrapper container">
        <div className="logo-RSS">
          <img src="logo-Rss.svg" />
        </div>
        <p className="date">2022</p>
        <ul className="links-gitHub-command__list">
          <li className="links-gitHub-command__item">
            <a className="link-gitHub" href="https://github.com/IlonMakh">
              @ilonmakh
            </a>
          </li>
          <li className="links-gitHub-command__item">
            <a className="link-gitHub" href="https://github.com/tadior">
              @tadior
            </a>
          </li>
          <li className="links-gitHub-command__item">
            <a className="link-gitHub" href="https://github.com/andrewmatsiash">
              @andrewmatsiash
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
