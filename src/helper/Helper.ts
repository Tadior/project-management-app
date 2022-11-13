const getCookieToken = (name = 'token') => {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

const deleteCookieToken = (name = 'token') => {
  document.cookie = encodeURIComponent(name) + '=; max-age: -1 ';
};

const setTokenToCookie = (token: string) => {
  document.cookie = `token=${token}; path=/;`;
};

export { getCookieToken, deleteCookieToken, setTokenToCookie };
