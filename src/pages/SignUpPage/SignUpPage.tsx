import React from 'react';
import { useLocation } from 'react-router-dom';
import { AuthForm } from '../../components/AuthForm/Auth-form';

export const SignUpPage = () => {
  const { pathname } = useLocation();

  return (
    <section className="sign-in__wrapper">
      <AuthForm page={pathname} />
    </section>
  );
};
