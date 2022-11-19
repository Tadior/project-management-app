import React from 'react';
import TextField from '@mui/material/TextField';
import { useForm, SubmitHandler, Controller, useFormState } from 'react-hook-form';
import { loginValidation, passwordValidation } from './validation';
import { useSignInMutation, useSignUpMutation } from '../../redux/query/AuthQuery';
import { useGetUsersMutation } from '../../redux/query/UsersQuery';
import { setTokenToCookie } from '../../helper/Helper';
import { useAppDispatch } from '../../hooks/redux';
import { userSlice } from '../../redux/reducer/userSlice';
import { userApi } from '../../types/types';
import { useNavigate } from 'react-router-dom';

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
