import React from 'react';
import { AuthForm } from '../../components/AuthForm/Auth-form';

export const SignInPage = () => {
  const user = true;
  return (
    <section className="sign-in__wrapper">
      <AuthForm user={user} />
    </section>
  );
};
