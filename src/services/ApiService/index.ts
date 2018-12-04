import * as serializeError from 'serialize-error';

import { APIResponse, ResponseStatus } from '../../types/commons';
import { getAdminOrganizationSettings, getAdminThemes, saveAdminLogo, saveAdminTheme } from './admin';
import { createAdminApp, deleteAdminApp, getAdminApp, getAdminApps, getDirectoryAppList, updateAdminApp } from './apps';
import { login } from './auth';
import { getUserLayouts, getUserSettings, saveUserLayout, saveUserSettings } from './user';
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
  createAdminUser: withTry(createAdminUser),
  deleteAdminApp: withTry(deleteAdminApp),
  deleteAdminUser: withTry(deleteAdminUser),
  getAdminApp: withTry(getAdminApp),
  getAdminApps: withTry(getAdminApps),
  getAdminOrganizationSettings: withTry(getAdminOrganizationSettings),
  getAdminThemes: withTry(getAdminThemes),
  getAdminUser: withTry(getAdminUser),
  getAdminUsers: withTry(getAdminUsers),
  getDirectoryAppList: withTry(getDirectoryAppList),
  getUserLayouts: withTry(getUserLayouts),
  getUserSettings: withTry(getUserSettings),
  login: withTry(login),
  saveAdminLogo: withTry(saveAdminLogo),
  saveAdminTheme: withTry(saveAdminTheme),
  saveUserLayout: withTry(saveUserLayout),
  saveUserSettings: withTry(saveUserSettings),
  updateAdminApp: withTry(updateAdminApp),
  updateAdminUser: withTry(updateAdminUser),
};
