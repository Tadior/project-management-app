import Ball from '../../assets/images/magic_ball.gif';

export const Preloader = () => {
  return (
    <div className="preloader">
      <img className="preloader__ball" src={Ball} alt="magic_ball" />
      <p className="preloader__text">Loading...</p>
    </div>
  );
};
