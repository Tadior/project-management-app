export const Footer = () => {
  const linksGitHubCommand = [
    { text: '@ilonmakh', link: 'https://github.com/IlonMakh' },
    { text: '@tadior', link: 'https://github.com/tadior' },
    { text: '@andrewmatsiash', link: 'https://github.com/andrewmatsiash' },
  ];

  return (
    <footer className="footer">
      <div className="footer-wrapper container">
        <div className="logo-RSS">
          <img src="logo-Rss.svg" />
        </div>
        <p className="date">2022</p>
        <ul className="links-gitHub-command__list">
          {linksGitHubCommand.map(({ link, text }, i) => (
            <li key={i} className="links-gitHub-command__item">
              <a className="link-gitHub" href={link}>
                {text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};
