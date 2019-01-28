import { getAdminOrgSettings, getOrgSettings, saveAdminOrgSettings } from './admin';
import { createAdminApp, deleteAdminApp, getAdminApp, getAdminApps, getDirectoryAppList, updateAdminApp } from './apps';
import { login, logout, newPasswordLogin } from './auth';
import { createUserLayout, getUserLayouts, getUserSettings, saveUserSettings, updateUserLayout } from './user';
import { createAdminUser, deleteAdminUser, getAdminUser, getAdminUsers, updateAdminUser } from './users';

export default {
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

  getOrgSettings,

  login,
  logout,
  newPasswordLogin,

  getAdminOrgSettings,
  saveAdminOrgSettings,

  createUserLayout,
  getUserLayouts,
  updateUserLayout,

  getUserSettings,
  saveUserSettings,
};
