import React from 'react';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';
import { loginValidation, passwordValidation, nameValidation } from '../../helper/validation';
import { setUserToCookie } from '../../helper/Helper';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from './useAuth';
import { useSubmit } from './useSubmit';

interface ISignInFormProps {
  page: string;
}

export const AuthForm: React.FC<ISignInFormProps> = ({ page }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { registration, authorization, getUserByLogin } = useAuth();

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

  //sign-in
  const { onSubmit: onSignInSubmit } = useSubmit(async (_, login, password) => {
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
      <p className="auth-form__subtitle">
        {page === '/signUp' ? t('header_signUp') : t('header_signIn')}
      </p>
      <form
        className="auth-form__form"
        onSubmit={page === '/signUp' ? onSignUpSubmit : onSignInSubmit}
      >
        {page === '/signUp' && (
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
        )}

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
