import React from 'react';
import TextField from '@mui/material/TextField';
import { useForm, SubmitHandler, Controller, useFormState } from 'react-hook-form';
import { loginValidation, passwordValidation } from './validation';

interface ISignInForm {
  login: string;
  password: string;
  name: string;
}
interface ISignInFormProps {
  page: string;
}

export const AuthForm: React.FC<ISignInFormProps> = ({ page }) => {
  const { handleSubmit, control } = useForm<ISignInForm>();
  const { errors } = useFormState({
    control,
  });

  const onSubmit: SubmitHandler<ISignInForm> = (data) => console.log(data);

  return (
    <div className="auth-form">
      <h2 className="auth-form_title">Welcome, Wizard!</h2>
      <p className="auth-form__subtitle"> {page === '/signUp' ? `Sign up` : `Sign in`}</p>
      <form className="auth-form__form" onSubmit={handleSubmit(onSubmit)}>
        {page === '/signUp' && (
          <Controller
            control={control}
            name="name"
            rules={loginValidation}
            render={({ field }) => (
              <TextField
                color="secondary"
                variant="outlined"
                label="NAME"
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
        )}

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
          {page === '/signUp' ? `Sign up` : `Sign in`}
        </button>
        <div className="dividing-line"></div>
        {page === '/signUp' ? (
          <a href="#" className="sign-up-link">
            Already have an account? Sign in
          </a>
        ) : (
          <a href="#" className="sign-up-link">
            Don’t have an account yet? Sign up
          </a>
        )}
      </form>
      <div className="auth-form__footer"></div>
    </div>
  );
};
