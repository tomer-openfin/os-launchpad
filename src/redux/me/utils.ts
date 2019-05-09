import { all, call, fork, put, take } from 'redux-saga/effects';

import { authWindows, defaultWindows, LOGIN_WINDOW } from '../../config/windows';
import { removeApplicationTrayIcon } from '../../utils/finUtils';
import getOwnUuid from '../../utils/getOwnUuid';
import { initResources, launchAppLauncher } from '../application';
import { registerGlobalHotkeys } from '../globalHotkeys/utils';
import { initSystemTrayIcon } from '../system';
import { launchWindow, windowClosed } from '../windows';
import { initWindows } from '../windows/utils';

export function* loginFlow(isLoggedIn: boolean) {
  const uuid = getOwnUuid();

  if (!isLoggedIn) {
    yield call(removeApplicationTrayIcon({ uuid }));
    yield put(launchWindow(authWindows.login));
  }

  const windows = yield fork(initWindows, defaultWindows);
  if (!isLoggedIn) {
    yield all([take(action => action.type === windowClosed.toString() && action.payload.name === LOGIN_WINDOW), call(windows.toPromise)]);
  } else {
    yield call(initResources);
    yield call(windows.toPromise);
  }

  // Register global hotkeys
  registerGlobalHotkeys(window.store.dispatch);
  // Show system tray icon
  yield call(initSystemTrayIcon);
  // Show launcher
  yield put(launchAppLauncher());
}
