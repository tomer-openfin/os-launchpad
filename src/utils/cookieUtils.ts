const AUTH_COOKIE_NAME = 'ofauth';

export const eraseCookie = () => (document.cookie = `${AUTH_COOKIE_NAME}=; Max-Age=-99999999;`);

export const detectAuth = () => {
  const authRegEx = new RegExp(AUTH_COOKIE_NAME, 'gi');
  return authRegEx.test(document.cookie);
};
