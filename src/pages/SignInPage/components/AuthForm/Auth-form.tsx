import React from 'react';
import TextField from '@mui/material/TextField';
import { useForm, SubmitHandler, Controller, useFormState } from 'react-hook-form';
import { loginValidation, passwordValidation } from './validation';

interface ISignInForm {
  login: string;
  password: string;
}

export const AuthForm: React.FC = () => {
  const { handleSubmit, control } = useForm<ISignInForm>();
  const { errors } = useFormState({
    control,
  });

  const onSubmit: SubmitHandler<ISignInForm> = (data) => console.log(data);

  return (
    <div className="auth-form">
      <h2 className="auth-form_title">Welcome, Wizard!</h2>
      <p className="auth-form__subtitle">Sign In</p>
      <form className="auth-form__form" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="login"
          rules={loginValidation}
          render={({ field }) => (
            <TextField
              color="secondary"
              variant="outlined"
              label="LOGIN"
              onChange={(e) => field.onChange(e)}
              value={field.value}
              fullWidth={true}
              size="small"
              className="auth-form__input"
              error={!!errors.login?.message}
              helperText={errors?.login?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={passwordValidation}
          render={({ field }) => (
            <TextField
              color="secondary"
              variant="outlined"
              label="PASSWORD"
              onChange={(e) => field.onChange(e)}
              value={field.value}
              fullWidth={true}
              size="small"
              type="password"
              className="auth-form__input"
              error={!!errors?.password?.message}
              helperText={errors?.password?.message}
            />
          )}
        />
        <button className="button-border" type="submit">
          Sign in
        </button>
        <div className="dividing-line"></div>
        <a href="#" className="sign-up-link">
          Don’t have an accout yet? Sign up
        </a>
      </form>
      <div className="auth-form__footer"></div>
    </div>
  );
};
