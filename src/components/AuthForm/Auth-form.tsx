import React from 'react';
import TextField from '@mui/material/TextField';
import { useForm, SubmitHandler, Controller, useFormState } from 'react-hook-form';
import { loginValidation, passwordValidation, nameValidation } from '../../helper/validation';
import { useSignInMutation, useSignUpMutation } from '../../redux/query/AuthQuery';
import { useGetUsersMutation } from '../../redux/query/UsersQuery';
import { setValueToCookie, setUserToCookie } from '../../helper/Helper';
import { userApi } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

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
  const navigate = useNavigate();
  const [createUser] = useSignUpMutation();
  const [getToken] = useSignInMutation();
  const [getUsers] = useGetUsersMutation();
  const { t } = useTranslation();
  const { handleSubmit, control } = useForm<ISignInForm>({
    reValidateMode: 'onBlur',
    mode: 'all',
  });
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
    setValueToCookie('token', token);
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
        toast(t('signUp_success'), {
          containerId: 'success',
        });
        navigate('/signIn');
      } else {
        await authorization(login, password);
        const user = await getUserByLogin(login);
        user &&
          setUserToCookie({
            _id: user._id,
            login: user.login,
            name: user.name,
            password: password,
          });
        toast(t('signIn_success'), {
          containerId: 'success',
        });
        navigate('/projects');
      }
    } catch (error) {
      if ((error as FetchBaseQueryError).status === 409) {
        toast(t('login_warning'), {
          containerId: 'warning',
        });
      } else if ((error as FetchBaseQueryError).status === 401) {
        toast(t('signIn_error'), {
          containerId: 'error',
        });
      } else if ((error as FetchBaseQueryError).status === 400) {
        toast(t('sendData_error'), {
          containerId: 'error',
        });
      }
    }
  };

  const nameRules = nameValidation(t('validation_name', { returnObjects: true }));
  const loginRules = loginValidation(t('validation_login', { returnObjects: true }));
  const passwordRules = passwordValidation(t('validation_password', { returnObjects: true }));

  return (
    <div className="auth-form">
      <h2 className="auth-form_title">{t('sign_hello')}</h2>
      <p className="auth-form__subtitle">
        {page === '/signUp' ? t('header_signUp') : t('header_signIn')}
      </p>
      <form className="auth-form__form" onSubmit={handleSubmit(onSubmit)}>
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
