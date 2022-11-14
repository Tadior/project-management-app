import React from 'react';
import TextField from '@mui/material/TextField';
import { useForm, SubmitHandler, Controller, useFormState } from 'react-hook-form';
import { loginValidation, passwordValidation } from './validation';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface ISignInForm {
  login: string;
  password: string;
  name: string;
}
interface ISignInFormProps {
  page: string;
}

export const AuthForm: React.FC<ISignInFormProps> = ({ page }) => {
  const { t } = useTranslation();
  const { handleSubmit, control } = useForm<ISignInForm>();
  const { errors } = useFormState({
    control,
  });

  const onSubmit: SubmitHandler<ISignInForm> = (data) => console.log(data);

  return (
    <div className="auth-form">
      <h2 className="auth-form_title">{t('sign_hello')}</h2>
      <p className="auth-form__subtitle">
        {' '}
        {page === '/signUp' ? t('header_signUp') : t('header_signIn')}
      </p>
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
                label={t('sign_name')}
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
              label={t('sign_login')}
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
              label={t('sign_password')}
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
          {page === '/signUp' ? t('sign_signUp') : t('sign_signIn')}
        </button>
        <div className="dividing-line"></div>
        {page === '/signUp' ? (
          <Link to="/signIn" className="sign-up-link">
            {t('signIn_offer')}
          </Link>
        ) : (
          <Link to="/signUp" className="sign-up-link">
            {t('signUp_offer')}
          </Link>
        )}
      </form>
      <div className="auth-form__footer"></div>
    </div>
  );
};
