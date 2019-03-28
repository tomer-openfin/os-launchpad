import { getApiUrl } from '../../utils/processHelpers';

const API_URL = getApiUrl();

export const CREATE_MANIFEST_BASE = 'api/app.json?appurl=';

const API = {
  PUBLIC_APPS: 'https://app-directory.openfin.co/api/v1/apps',

  CREATE_MANIFEST: (appUrl: string, baseUrl?: string, runtimeVersion?: string) => {
    const url = `${baseUrl || API_URL}${CREATE_MANIFEST_BASE}${appUrl}`;

    return runtimeVersion ? `${url}&runtime=${runtimeVersion}` : url;
  },

  CONFIRM_PASSWORD: `${API_URL}api/auth/password/confirm`,
  FORGOT_PASSWORD: `${API_URL}api/auth/password/forgot`,
  LOGIN: `${API_URL}api/auth/login`,
  LOGOUT: `${API_URL}api/auth/logout`,
  NEW_PASSWORD: `${API_URL}api/auth/password/new`,
  UPDATE_PASSWORD: `${API_URL}api/user/password`,

  ORG_SETTINGS: `${API_URL}api/config`,

  USER_APPS: `${API_URL}api/user/apps`,
  USER_INFO: `${API_URL}api/user/info`,
  USER_LAYOUTS: `${API_URL}api/user/layouts`,
  USER_SETTINGS: `${API_URL}api/user/settings`,

  ADMIN_APPS: `${API_URL}api/admin/apps`,
  ADMIN_MANIFEST: `${API_URL}api/launcher.json`,
  ADMIN_MANIFEST_OVERRIDE: `${API_URL}api/admin/manifest`,
  ADMIN_SETTINGS: `${API_URL}api/admin/settings`,
  ADMIN_USERS: `${API_URL}api/admin/users`,

  SEND_BUG: `${API_URL}api/feedback/bug`,
  SEND_FEEDBACK: `${API_URL}api/feedback/feature`,
};

export default API;
