import { Store } from 'redux';

import AppData from '../src/samples/AppData';
import UsersData from '../src/samples/UserData';
import { MockUser } from '../src/services/ApiService/__mocks__/auth';
import { MockUserSettings } from '../src/services/ApiService/__mocks__/user';

import { getAdminAppsSuccess, getAdminUsersSuccess } from '../src/redux/admin';
import { setAppDirectoryList } from '../src/redux/apps';
import { getSettingsSuccess, setMe } from '../src/redux/me';
import { getAndSetMonitorInfoRequest } from '../src/redux/system';

/**
 * Initializes default redux store for storybook
 *
 * @param store - Redux Store
 */
export const initStorybookStore = (store: Store) => {
  store.dispatch(setAppDirectoryList(AppData));
  store.dispatch(getSettingsSuccess(MockUserSettings));
  store.dispatch(getAdminUsersSuccess(UsersData));
  store.dispatch(getAdminAppsSuccess(AppData));
  store.dispatch(setMe(MockUser));
  store.dispatch(getAndSetMonitorInfoRequest());
};
