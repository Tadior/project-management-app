import { useSignInMutation, useSignUpMutation } from '../../redux/query/AuthQuery';
import { useGetUsersMutation } from '../../redux/query/UsersQuery';
import { setValueToCookie } from '../../helper/Helper';
import { userApi } from '../../types/types';

type TFnRegistration = (name: string, login: string, password: string) => void;
type TFnAuthorization = (login: string, password: string) => void;

export const useAuth = () => {
  const [createUser] = useSignUpMutation();
  const [getToken] = useSignInMutation();
  const [getUsers] = useGetUsersMutation();

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

  return { registration, authorization, getUserByLogin };
};
