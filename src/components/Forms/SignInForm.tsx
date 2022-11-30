import React from 'react';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';
import { loginValidation, passwordValidation, nameValidation } from '../../helper/validation';
import { setUserToCookie } from '../../helper/Helper';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useAuth } from './useAuth';
import { useSubmit } from './useSubmit';

export const SignInForm: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { authorization, getUserByLogin } = useAuth();

  const {
    onSubmit: onSignInSubmit,
    errors,
    control,
  } = useSubmit(async (_, login, password) => {
    debugger;
    await authorization(login as string, password as string);
    const user = await getUserByLogin(login as string);
    user &&
      setUserToCookie({
        _id: user._id,
        login: user.login,
        name: user.name,
        password: password as string,
      });
    toast(t('signIn_success'), {
      containerId: 'success',
    });
    navigate('/projects');
  });

  const nameRules = nameValidation(t('validation_name', { returnObjects: true }));
  const loginRules = loginValidation(t('validation_login', { returnObjects: true }));
  const passwordRules = passwordValidation(t('validation_password', { returnObjects: true }));

  return (
    <div className="auth-form">
      <h2 className="auth-form_title">{t('sign_hello')}</h2>
      <p className="auth-form__subtitle">{t('header_signIn')}</p>
      <form className="auth-form__form" onSubmit={onSignInSubmit}>
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
          {t('sign_signIn')}
        </button>
        <div className="dividing-line">
          <Link to="/signIn" className="sign-up-link">
            {t('signIn_offer')}
          </Link>
        </div>
      </form>
    </div>
  );
};
