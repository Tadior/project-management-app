import { userApiState } from '../types/types';

const getCookie = (name: string) => {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

const deleteCookie = (name: string) => {
  document.cookie = encodeURIComponent(name) + '=; max-age: -1 ';
};

const setValueToCookie = (name: string, value: string) => {
  document.cookie = `${name}=${value}; path=/;`;
};

const setUserToCookie = (user: userApiState) => {
  const userData = JSON.stringify(user);
  document.cookie = `userData=${userData}; path=/;`;
};

const getUserCookie = () => {
  const body = getCookie('userData');
  if (body) {
    return JSON.parse(body);
  }
};

export { getCookie, deleteCookie, setValueToCookie, setUserToCookie, getUserCookie };
