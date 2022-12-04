import { useAppDispatch } from '../../hooks/redux';
import { setBurgerStatus } from '../../redux/reducer/UserSlice';
import LogoImg from '../../assets/icons/logo.png';

export const Logo = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="logo" onClick={() => dispatch(setBurgerStatus(false))}>
      <img className="logo__img" src={LogoImg} alt="logo" />
      <p className="logo__text">
        Mana <br /> Projects
      </p>
    </div>
  );
};
