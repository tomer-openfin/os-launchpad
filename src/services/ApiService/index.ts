import * as serializeError from 'serialize-error';

import { APIResponse, ResponseStatus } from '../../types/commons';
import { getAdminOrgSettings, getOrgSettings, saveAdminOrgSettings } from './admin';
import { createAdminApp, deleteAdminApp, getAdminApp, getAdminApps, getDirectoryAppList, updateAdminApp } from './apps';
import { confirmPassword, forgotPassword, login, logout, newPasswordLogin } from './auth';
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

const handleError = e => {
  return Promise.resolve({ status: ResponseStatus.FAILURE, message: `${serializeError(e).message}` });
};

// Works with up to 2 args for now, add additional T generics to allow use of api methods with more args as the use case arises
const withTry = <R>(fn: (T1?, T2?) => Promise<R>): ((T1?, T2?) => Promise<R | APIResponse>) => (...args): Promise<R | APIResponse> => {
  try {
    return fn(...args).catch(e => {
      return handleError(e);
    });
  } catch (e) {
    return handleError(e);
  }
};

export default {
  createAdminApp: withTry(createAdminApp),
  deleteAdminApp: withTry(deleteAdminApp),
  getAdminApp: withTry(getAdminApp),
  getAdminApps: withTry(getAdminApps),
  updateAdminApp: withTry(updateAdminApp),

  createAdminUser: withTry(createAdminUser),
  deleteAdminUser: withTry(deleteAdminUser),
  getAdminUser: withTry(getAdminUser),
  getAdminUsers: withTry(getAdminUsers),
  updateAdminUser: withTry(updateAdminUser),

  getDirectoryAppList: withTry(getDirectoryAppList),

  getOrgSettings: withTry(getOrgSettings),

  confirmPassword: withTry(confirmPassword),
  forgotPassword: withTry(forgotPassword),
  login: withTry(login),
  logout: withTry(logout),
  newPasswordLogin: withTry(newPasswordLogin),

  getAdminOrgSettings: withTry(getAdminOrgSettings),
  saveAdminOrgSettings: withTry(saveAdminOrgSettings),

  getUserInfo: withTry(getUserInfo),

  createUserLayout: withTry(createUserLayout),
  deleteUserLayout: withTry(deleteUserLayout),
  getUserLayouts: withTry(getUserLayouts),
  updateUserLayout: withTry(updateUserLayout),

  getUserSettings: withTry(getUserSettings),
  saveUserSettings: withTry(saveUserSettings),

  updateUserPassword: withTry(updateUserPassword),
};
