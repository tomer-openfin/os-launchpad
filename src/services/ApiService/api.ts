const API_URL = process.env.API_URL || '/';

const API = {
  PUBLIC_APPS: 'https://app-directory.openfin.co/api/v1/apps',

  LOGIN: `${API_URL}api/auth/login`,

  LAYOUTS: `${API_URL}api/layouts`,
  THEMES: `${API_URL}api/themes`,

  USER_APPS: `${API_URL}api/user/apps`,
  USER_SETTINGS: `${API_URL}api/user/settings`,

  ADMIN_USERS: `${API_URL}api/admin/users`,
};

export default API;
