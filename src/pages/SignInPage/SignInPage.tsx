import React from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthForm } from '../../components/AuthForm/Auth-form';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setIsTokenExpired } from '../../redux/reducer/UserSlice';

export const SignInPage = () => {
  const { pathname } = useLocation();
  const { isTokenExpired } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  if (isTokenExpired) {
    toast('invalid token', {
      containerId: 'error',
    });
    dispatch(setIsTokenExpired(false));
  }

  return (
    <section className="sign-in__wrapper">
      <AuthForm page={pathname} />
    </section>
  );
};
