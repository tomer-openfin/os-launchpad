import { getAdminManifest, getAdminManifestOverrides, getAdminOrgSettings, getOrgSettings, saveAdminManifestOverrides, saveAdminOrgSettings } from './admin';
import { createAdminApp, deleteAdminApp, getAdminApp, getAdminApps, getDirectoryAppList, updateAdminApp } from './apps';
import { confirmPassword, forgotPassword, login, logout, newPasswordLogin } from './auth';
import { sendBug, sendFeedback } from './support';
import {
  createUserLayout,
  deleteUserLayout,
  getUserInfo,
  getUserLayouts,
  getUserSettings,
  saveUserSettings,
  updateUserLayout,
  updateUserPassword,
} from './user';
import { createAdminUser, deleteAdminUser, getAdminUser, getAdminUsers, updateAdminUser } from './users';

const ApiService = {
  createAdminApp,
  deleteAdminApp,
  getAdminApp,
  getAdminApps,
  updateAdminApp,

  createAdminUser,
  deleteAdminUser,
  getAdminUser,
  getAdminUsers,
  updateAdminUser,

  getDirectoryAppList,

  getAdminManifest,
  getAdminManifestOverrides,
  getAdminOrgSettings,
  getOrgSettings,
  saveAdminManifestOverrides,
  saveAdminOrgSettings,

  confirmPassword,
  forgotPassword,
  login,
  logout,
  newPasswordLogin,

  getUserInfo,

  createUserLayout,
  deleteUserLayout,
  getUserLayouts,
  updateUserLayout,

  getUserSettings,
  saveUserSettings,

  updateUserPassword,

  sendBug,
  sendFeedback,
};

export default ApiService;
