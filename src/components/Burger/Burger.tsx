import openBurgerIcon from '../../assets/icons/open-burger_icon.svg';
import closeBurgerIcon from '../../assets/icons/close-burger_icon.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setBurgerStatus } from '../../redux/reducer/UserSlice';

export const Burger = () => {
  const { isBurgerOpen } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();

  return (
    <div onClick={() => dispatch(setBurgerStatus(!isBurgerOpen))} className="burger">
      <img src={!isBurgerOpen ? closeBurgerIcon : openBurgerIcon} alt="menu-icon" />
    </div>
  );
};
