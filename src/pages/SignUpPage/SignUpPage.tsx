import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { AuthForm } from '../../components/AuthForm/Auth-form';

export const SignUpPage = () => {
  const { pathname } = useLocation();

  console.log(pathname);
  // console.log(user2);

  return (
    <section className="sign-in__wrapper">
      <AuthForm page={pathname} />
    </section>
  );
};
