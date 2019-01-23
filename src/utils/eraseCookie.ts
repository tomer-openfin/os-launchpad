const COOKIE_NAME = 'ofauth';

const eraseCookie = () => document.cookie = `${COOKIE_NAME}=; Max-Age=-99999999;`;

export default eraseCookie;
