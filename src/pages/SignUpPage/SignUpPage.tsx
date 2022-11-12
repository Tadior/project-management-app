import React from 'react';
import { AuthForm } from '../../components/AuthForm/Auth-form';

export const SignUpPage = () => {
  const user = false;
  return (
    <section className="sign-in__wrapper">
      <AuthForm user={user} />
    </section>
  );
};
