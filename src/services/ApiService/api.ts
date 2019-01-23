const API_URL = process.env.API_URL || '/';

const API = {
  PUBLIC_APPS: 'https://app-directory.openfin.co/api/v1/apps',

  CREATE_MANIFEST: (runtimeVersion: string, appUrl: string, baseUrl: string) => `${baseUrl}api/app.json?runtime=${runtimeVersion}&appurl=${appUrl}`,

  LOGIN: `${API_URL}api/auth/login`,
  LOGOUT: `${API_URL}api/auth/logout`,
  NEW_PASSWORD: `${API_URL}api/auth/password/new`,

  ORG_SETTINGS: `${API_URL}api/config`,

  USER_APPS: `${API_URL}api/user/apps`,
  USER_INFO: `${API_URL}api/user/info`,
  USER_LAYOUTS: `${API_URL}api/user/layouts`,
  USER_SETTINGS: `${API_URL}api/user/settings`,

  ADMIN_APPS: `${API_URL}api/admin/apps`,
  ADMIN_SETTINGS: `${API_URL}api/admin/settings`,
  ADMIN_USERS: `${API_URL}api/admin/users`,
};

export default API;
