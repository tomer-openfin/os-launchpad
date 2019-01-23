import { Application, Window } from '@giantmachines/redux-openfin';
import { all, call, put, select, take, takeLatest } from 'redux-saga/effects';

import { ErrorResponse } from '../../types/commons';
import { ResponseStatus } from '../../types/enums';

import ApiService from '../../services/ApiService';
import eraseCookie from '../../utils/eraseCookie';

import { getAdminAppsRequest, getAdminUsersRequest } from '../admin';
import { launchAppLauncher, reboundLauncherRequest } from '../application';
import { getAppDirectoryList } from '../apps';
import { getLayoutsRequest } from '../layouts';
import { getAdminOrgSettingsRequest } from '../organization';
import {
  ADD_TO_APP_LAUNCHER,
  changePassword,
  GET_ME,
  GET_SETTINGS,
  getMeError,
  getMeSuccess,
  getSettingsError,
  getSettingsRequest,
  getSettingsSuccess,
  LOGIN,
  LOGIN_WITH_NEW_PASSWORD,
  loginError,
  loginSuccess,
  LOGOUT,
  logoutError,
  logoutSuccess,
  REMOVE_FROM_APP_LAUNCHER,
  SAVE_SETTINGS,
  saveSettingsRequest,
  saveSettingsSuccess,
  SET_AUTO_HIDE,
  SET_LAUNCHER_POSITION,
  setMe,
} from './actions';
import { getMeSettings } from './selectors';
import { LoginError, LoginRequest, LoginSuccess, LoginWithNewPassword, LogoutError } from './types';

const GENERIC_API_ERROR: ErrorResponse = { status: ResponseStatus.FAILURE, message: 'Failed to get response from server' };

function* watchGetMeRequest() {
  const result = yield call(ApiService.getUserInfo);

  const { status, code, message, session } = result;

  if (status === ResponseStatus.FAILURE) {
    yield put(getMeError({ status, code, message, session }));
  } else {
    const { email, firstName, lastName, isAdmin } = result;

    yield put(getMeSuccess({ isAdmin, email, firstName, lastName }));
  }
}

function* watchLoginRequest(action: LoginRequest) {
  const { payload } = action;

  if (!payload) {
    return;
  }

  const result = yield call(ApiService.login, payload);

  const { status, code, message, session } = result;

  if (status === ResponseStatus.FAILURE) {
    yield put(loginError({ status, code, message, session }));
  } else {
    const { email, firstName, lastName, isAdmin } = result;

    yield put(loginSuccess({ isAdmin, email, firstName, lastName }));
  }
}

function* watchLoginWithNewPassword(action: LoginWithNewPassword) {
  const { payload } = action;

  if (!payload) {
    return;
  }

  const result = yield call(ApiService.newPasswordLogin, payload);

  const { status, code, message, session } = result;

  if (status === ResponseStatus.FAILURE) {
    yield put(loginError({ status, code, message, session }));
  } else {
    const { email, firstName, lastName, isAdmin } = result;

    yield put(loginSuccess({ isAdmin, email, firstName, lastName }));
  }
}

function* watchLoginSuccess(action: LoginSuccess) {
  const { payload } = action;

  if (!payload) {
    return;
  }

  yield put(setMe(payload));

  if (payload.isAdmin) {
    yield all([put(getAdminAppsRequest()), put(getAdminUsersRequest()), put(getAdminOrgSettingsRequest())]);
  }

  // take(GET_SETTINGS.SUCCESS) to wait for launcher position before showing launcher
  yield all([take([GET_SETTINGS.SUCCESS, GET_SETTINGS.ERROR]), put(getAppDirectoryList()), put(getLayoutsRequest()), put(getSettingsRequest())]);

  // TODO: Use window config
  yield put(Window.closeWindow({ id: 'osLaunchpadLogin' }));

  yield put(launchAppLauncher());
}

function* watchLoginError(action: LoginError) {
  const { payload } = action;

  if (!payload) {
    return;
  }

  const { code, session, message } = payload;

  if (code === 'NewPasswordRequired' && session) {
    yield put(changePassword({ session, message }));
  } else {
    // tslint:disable-next-line:no-console
    console.log('Error Message:', message);
  }
}

function* watchLogoutRequest() {
  const result = yield call(ApiService.logout);

  if (!result) yield put(logoutError(GENERIC_API_ERROR));

  const { status, message } = result;

  if (status === ResponseStatus.FAILURE) {
    yield put(logoutError({ status, message }));
  } else {
    yield put(logoutSuccess());
  }
}

function* watchLogoutSuccess() {
  eraseCookie();

  yield put(Application.restart());

  // TODO: instead of restarting app, reset store, hide all windows, and show login window
  // https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store

  // // RESET SLICES OF STORE

  // // Hide Windows
  // const launcherFinWindow = yield call(getLauncherFinWindow);

  // if (launcherFinWindow) {
  //   launcherFinWindow.hide();
  // }

  // yield all(Object.keys(initOnStartWindows).map(window => put(Window.hideWindow({ id: initOnStartWindows[window].id }))));

  // // Show Login Window
  // yield put(launchWindow(windowsConfig.login));
}

function* watchLogoutError(action: LogoutError) {
  const { payload } = action;

  if (!payload) {
    return;
  }

  const { message } = payload;

  // tslint:disable-next-line:no-console
  console.log('Error Message:', message);
}

function* watchGetSettingsRequest() {
  const result = yield call(ApiService.getUserSettings);

  if (result.status === ResponseStatus.FAILURE) {
    // TODO validate result against settings state (e.g. invalid position issue)
    // if invalid fall back to defaults and save in api
    yield put(getSettingsError(result));
  } else {
    yield put(getSettingsSuccess(result));
  }
}

function* watchGetSettingsSuccess() {
  yield put(reboundLauncherRequest(false, 0));
}

function* watchSetAutoHide() {
  yield put(reboundLauncherRequest(false, 0));

  yield put(saveSettingsRequest());
}

function* watchSetLaunchbarPosition() {
  yield put(reboundLauncherRequest(false, 0));

  yield put(saveSettingsRequest());
}

function* watchSaveSettingsRequest() {
  const settings = yield select(getMeSettings);

  // TODO: error handling
  yield call(ApiService.saveUserSettings, settings);

  yield put(saveSettingsSuccess());
}

function* watchUpdateLauncherApps(delay: number) {
  yield put(reboundLauncherRequest(true, delay));

  yield put(saveSettingsRequest());
}

export function* meSaga() {
  yield takeLatest(LOGIN.REQUEST, watchLoginRequest);
  yield takeLatest(LOGIN.SUCCESS, watchLoginSuccess);
  yield takeLatest(LOGIN.ERROR, watchLoginError);

  yield takeLatest(GET_ME.REQUEST, watchGetMeRequest);
  yield takeLatest(GET_ME.SUCCESS, watchLoginSuccess);
  yield takeLatest(GET_ME.ERROR, watchLoginError);

  yield takeLatest(LOGOUT.REQUEST, watchLogoutRequest);
  yield takeLatest(LOGOUT.SUCCESS, watchLogoutSuccess);
  yield takeLatest(LOGOUT.ERROR, watchLogoutError);

  yield takeLatest(LOGIN_WITH_NEW_PASSWORD, watchLoginWithNewPassword);

  yield takeLatest(GET_SETTINGS.REQUEST, watchGetSettingsRequest);
  yield takeLatest(GET_SETTINGS.SUCCESS, watchGetSettingsSuccess);

  yield takeLatest(SAVE_SETTINGS.REQUEST, watchSaveSettingsRequest);

  yield takeLatest(ADD_TO_APP_LAUNCHER, watchUpdateLauncherApps, 0);
  yield takeLatest(REMOVE_FROM_APP_LAUNCHER, watchUpdateLauncherApps, 150);

  yield takeLatest(SET_LAUNCHER_POSITION, watchSetLaunchbarPosition);

  yield takeLatest(SET_AUTO_HIDE, watchSetAutoHide);
}
