import { Store } from 'redux';

import AppData from '../src/samples/AppData';
import UsersData from '../src/samples/UserData';
import { MockUser } from '../src/services/ApiService/__mocks__/auth';
import { MockUserSettings } from '../src/services/ApiService/__mocks__/user';

import { getAdminApps, getAdminUsers } from '../src/redux/admin';
import { getAppDirectoryList } from '../src/redux/apps';
import { getSettings, login } from '../src/redux/me';
import { getAndSetMonitorInfo } from '../src/redux/system';

/**
 * Initializes default redux store for storybook
 *
 * @param store - Redux Store
 */
export const initStorybookStore = (store: Store) => {
  store.dispatch(getAppDirectoryList.success(AppData));
  store.dispatch(getSettings.success(MockUserSettings));
  store.dispatch(getAdminUsers.success(UsersData));
  store.dispatch(getAdminApps.success(AppData));
  store.dispatch(login.success(MockUser));
  store.dispatch(getAndSetMonitorInfo.request());
};
