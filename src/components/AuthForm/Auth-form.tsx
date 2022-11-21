import React from 'react';
import TextField from '@mui/material/TextField';
import { useForm, SubmitHandler, Controller, useFormState } from 'react-hook-form';
import { loginValidation, passwordValidation } from './validation';
import { useSignInMutation, useSignUpMutation } from '../../redux/query/AuthQuery';
import { useGetUsersMutation } from '../../redux/query/UsersQuery';
import { setTokenToCookie } from '../../helper/Helper';
import { useAppDispatch } from '../../hooks/redux';
import { userSlice } from '../../redux/reducer/UserSlice';
import { userApi } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

interface ISignInForm {
  login: string;
  password: string;
  name: string;
}
interface ISignInFormProps {
  page: string;
}

type TFnRegistration = (name: string, login: string, password: string) => void;
type TFnAuthorization = (login: string, password: string) => void;

export const AuthForm: React.FC<ISignInFormProps> = ({ page }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { setUserData } = userSlice.actions;
  const [createUser, resultCreateUser] = useSignUpMutation();
  const [getToken, resultToken] = useSignInMutation();
  const [getUsers, resultGetUsers] = useGetUsersMutation();
  const { t } = useTranslation();
  const { handleSubmit, control } = useForm<ISignInForm>();
  const { errors } = useFormState({
    control,
  });

  const registration: TFnRegistration = async (name, login, password) => {
    await createUser({
      name: name,
      login: login,
      password: password,
    }).unwrap();
  };

  const authorization: TFnAuthorization = async (login, password) => {
    const { token } = await getToken({
      login: login,
      password: password,
    }).unwrap();
    setTokenToCookie(token);
  };

  const getUserByLogin = async (login: string) => {
    const users = await getUsers();
    const user = (users as { data: userApi[] }).data.find((user: userApi) => user.login === login);
    return user;
  };

  const onSubmit: SubmitHandler<ISignInForm> = async ({ name, login, password }) => {
    try {
      if (page === '/signUp') {
        await registration(name, login, password);
        navigate('/signIn');
      } else {
        await authorization(login, password);
        const user = await getUserByLogin(login);
        user &&
          dispatch(
            setUserData({
              _id: user._id,
              login: user.login,
              name: user.name,
              password: password,
            })
          );
        navigate('/projects');
      }
    } catch (error) {
      console.log(error);
    }
  };

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
                value={field.value || ''}
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
          rules={passwordValidation}
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
