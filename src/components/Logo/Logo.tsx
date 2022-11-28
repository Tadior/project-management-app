import { useAppDispatch } from '../../hooks/redux';
import { setBurgerStatus } from '../../redux/reducer/UserSlice';

export const Logo = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="logo" onClick={() => dispatch(setBurgerStatus(false))}>
      <img className="logo__img" src="icons/logo.png" alt="logo" />
      <p className="logo__text">
        Mana <br /> Projects
      </p>
    </div>
  );
};
