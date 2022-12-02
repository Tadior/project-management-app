import React from 'react';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from './useAuth';
import { useSubmit } from './useSubmit';
import { useFormValidationRules } from '../../hooks/useFormValidationRules';

export const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { loginRules, passwordRules, nameRules } = useFormValidationRules();
  const { registration } = useAuth();

  // sign-up
  const {
    onSubmit: onSignUpSubmit,
    errors,
    control,
  } = useSubmit(async (name, login, password) => {
    await registration(name as string, login as string, password as string);
    toast(t('signUp_success'), {
      containerId: 'success',
    });
    navigate('/signIn');
  });

  return (
    <div className="auth-form">
      <h2 className="auth-form_title">{t('sign_hello')}</h2>
      <p className="auth-form__subtitle">{t('header_signUp')}</p>
      <form className="auth-form__form" onSubmit={onSignUpSubmit}>
        <Controller
          control={control}
          name="name"
          rules={nameRules}
          render={({ field }) => (
            <TextField
              color="secondary"
              variant="outlined"
              label={t('sign_name')}
              onChange={(e) => field.onChange(e)}
              value={field.value || ''}
              fullWidth={true}
              size="small"
              className="auth-form__input"
              error={!!errors.name?.message}
              helperText={errors?.name?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="login"
          rules={loginRules}
          render={({ field }) => (
            <TextField
              color="secondary"
              variant="outlined"
              label={t('sign_login')}
              onChange={(e) => field.onChange(e)}
              value={field.value || ''}
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
          rules={passwordRules}
          render={({ field }) => (
            <TextField
              color="secondary"
              variant="outlined"
              label={t('sign_password')}
              onChange={(e) => field.onChange(e)}
              value={field.value || ''}
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
          {t('sign_signUp')}
        </button>
        <div className="dividing-line"></div>
        <Link to="/signIn" className="sign-up-link">
          {t('signIn_offer')}
        </Link>
      </form>
      <div className="auth-form__footer"></div>
    </div>
  );
};
