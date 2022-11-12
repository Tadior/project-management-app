const getCookieToken = (name = 'token') => {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

const deleteCookieToken = (name = 'token') => {
  console.log(document.cookie);
  document.cookie = encodeURIComponent(name) + '=; max-age: -1 ';
  console.log(document.cookie);
};

export { getCookieToken, deleteCookieToken };
