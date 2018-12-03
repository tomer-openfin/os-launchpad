const API_URL = process.env.API_URL || '/';

const API = {
  APPS: `${API_URL}api/apps`,
  LAYOUTS: `${API_URL}api/layouts`,
  LOGIN: `${API_URL}api/auth/login`,
  SETTINGS: `${API_URL}api/user/settings`,
  THEMES: `${API_URL}api/themes`,

  ADMIN_APPS: `${API_URL}api/admin/apps`,
  ADMIN_USERS: `${API_URL}api/admin/users`,
};

export default API;
