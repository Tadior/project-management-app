import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { useForm, SubmitHandler, Controller, useFormState } from 'react-hook-form';
import {
  loginValidation,
  passwordValidation,
  nameValidation,
  nameValidationRu,
  loginValidationRu,
  passwordValidationRu,
} from '../../helper/validation';
import { useSignInMutation, useSignUpMutation } from '../../redux/query/AuthQuery';
import { useGetUsersMutation } from '../../redux/query/UsersQuery';
import { getCookieToken, setTokenToCookie } from '../../helper/Helper';
import { useAppDispatch } from '../../hooks/redux';
import { userSlice } from '../../redux/reducer/UserSlice';
import { userApi } from '../../types/types';
import { useNavigate } from 'react-router-dom';
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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { setUserData } = userSlice.actions;
  const [createUser, resultCreateUser] = useSignUpMutation();
  const [getToken, resultToken] = useSignInMutation();
  const [getUsers, resultGetUsers] = useGetUsersMutation();
  const { t } = useTranslation();
  const { handleSubmit, control } = useForm<ISignInForm>({
    reValidateMode: 'onBlur',
    mode: 'all',
  });
  const { errors } = useFormState({
    control,
  });

  const onSubmit: SubmitHandler<ISignInForm> = async ({ name, login, password }) => {
    if (page === '/signUp') {
      createUser({
        name: name,
        login: login,
        password: password,
      }).unwrap();
      navigate('/signIn');
    } else {
      getToken({
        login: login,
        password: password,
      })
        .unwrap()
        .then((data) => setTokenToCookie(data.token))
        .then(() => getUsers())
        .then((users) =>
          (users as { data: userApi[] }).data.find((user: userApi) => user.login === login)
        )
        .then((user) => {
          dispatch(
            setUserData({
              _id: user!._id,
              login: user!.login,
              name: user!.name,
              password: password,
            })
          );
          navigate('/projects');
        });
    }
  };

  const lang = getCookieToken('i18next');

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
            rules={lang === 'en' ? nameValidation : nameValidationRu}
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
                error={!!errors.name?.message}
                helperText={errors?.name?.message}
              />
            )}
          />
        )}

        <Controller
          control={control}
          name="login"
          rules={lang === 'en' ? loginValidation : loginValidationRu}
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
          rules={lang === 'en' ? passwordValidation : passwordValidationRu}
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
