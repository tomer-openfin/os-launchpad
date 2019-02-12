import { Application, Window } from '@giantmachines/redux-openfin';
import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';

import { ErrorResponse } from '../../types/commons';
import { ResponseStatus } from '../../types/enums';

import ApiService from '../../services/ApiService';
import eraseCookie from '../../utils/eraseCookie';

import { LOGIN_WINDOW } from '../../config/windows';
import { getAdminAppsRequest, getAdminUsersRequest } from '../admin';
import { initResources, launchAppLauncher, reboundLauncherRequest } from '../application';
import { getAdminOrgSettingsRequest } from '../organization';
import {
  ADD_TO_APP_LAUNCHER,
  CONFIRM_PASSWORD,
  confirmPasswordError,
  confirmPasswordSuccess,
  FORGOT_PASSWORD,
  forgotPasswordError,
  forgotPasswordSuccess,
  GET_ME,
  GET_SETTINGS,
  getMeError,
  getMeSuccess,
  getSettingsError,
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
  SET_LAUNCHER_MONITOR_SETTINGS,
  SET_LAUNCHER_POSITION,
  SET_LAUNCHER_SIZE,
  setMe,
  UPDATE_PASSWORD,
  updatePasswordError,
  updatePasswordSuccess,
} from './actions';
import { getMeSettings } from './selectors';
import { LoginError, LoginRequest, LoginSuccess, LoginWithNewPassword, LogoutError, UpdatePasswordRequest } from './types';

const GENERIC_API_ERROR: ErrorResponse = { status: ResponseStatus.FAILURE, message: 'Failed to get response from server' };

function* callSuccessMetaCb(action) {
  if (action.meta && action.meta.successCb) {
    action.meta.successCb(action.payload);
  }
}

function* callErrorMetaCb(action) {
  const error = action.payload;

  const errorMessage = error && typeof error === 'object' && error.message ? error.message : error || 'Unknown Error';

  // tslint:disable-next-line:no-console
  console.log('Error on', action.type, ':', errorMessage, '\n');

  if (action.meta && action.meta.errorCb) {
    action.meta.errorCb(errorMessage);
  }
}

function* callApiWithPayloadAndMeta(apiPromise, actions, action) {
  const { payload } = action;
  if (!payload) {
    return;
  }

  const result = yield call(apiPromise, payload);

  const { status } = result;

  if (status === ResponseStatus.FAILURE) {
    yield put(actions.error(result, action.meta));
  } else {
    yield put(actions.success(result, action.meta));
  }
}

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

  if (result.status === ResponseStatus.FAILURE) {
    yield put(loginError({ username: payload.username, ...result }, action.meta));
  } else {
    const { isAdmin, email, firstName, lastName } = result;

    yield put(loginSuccess({ isAdmin, email, firstName, lastName }, action.meta));
  }
}

function* watchLoginWithNewPassword(action: LoginWithNewPassword) {
  const { payload } = action;

  if (!payload) {
    return;
  }

  const result = yield call(ApiService.newPasswordLogin, payload);

  if (result.status === ResponseStatus.FAILURE) {
    yield put(loginError({ ...result, session: payload.session, username: payload.username }, action.meta));
  } else {
    const { isAdmin, email, firstName, lastName } = result;

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

  yield call(initResources);

  yield put(Window.closeWindow({ id: LOGIN_WINDOW }));

  yield put(launchAppLauncher());

  if (action.meta && action.meta.successCb) {
    action.meta.successCb();
  }
}

function* watchLoginError(action: LoginError) {
  const { payload } = action;
  if (!payload) {
    return;
  }

  if (action.meta && action.meta.errorCb) {
    action.meta.errorCb(payload);
  }
}

function* watchLogoutRequest() {
  const result = yield call(ApiService.logout);

  if (!result) {
    yield put(logoutError(GENERIC_API_ERROR));
    return;
  }

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
  console.error('Error Message:', message);

  eraseCookie();

  yield put(Application.restart());
}

function* watchGetSettingsRequest() {
  const result = yield call(ApiService.getUserSettings);

  if (!result || result.status === ResponseStatus.FAILURE) {
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

function* watchUpdatePasswordRequest(action: UpdatePasswordRequest) {
  const { payload } = action;

  const response = yield call(ApiService.updateUserPassword, payload);

  if (response.status === ResponseStatus.FAILURE) {
    yield put(updatePasswordError(response, action.meta));
  } else {
    yield put(updatePasswordSuccess(response, action.meta));
  }
}

function* reboundLauncherAndSaveSettings() {
  yield put(reboundLauncherRequest(false, 0));

  yield put(saveSettingsRequest());
}

export function* meSaga() {
  yield takeLatest(CONFIRM_PASSWORD.REQUEST, callApiWithPayloadAndMeta, ApiService.confirmPassword, {
    error: confirmPasswordError,
    success: confirmPasswordSuccess,
  });
  yield takeLatest(CONFIRM_PASSWORD.SUCCESS, callSuccessMetaCb);
  yield takeLatest(CONFIRM_PASSWORD.ERROR, callErrorMetaCb);

  yield takeLatest(FORGOT_PASSWORD.REQUEST, callApiWithPayloadAndMeta, ApiService.forgotPassword, {
    error: forgotPasswordError,
    success: forgotPasswordSuccess,
  });
  yield takeLatest(FORGOT_PASSWORD.SUCCESS, callSuccessMetaCb);
  yield takeLatest(FORGOT_PASSWORD.ERROR, callErrorMetaCb);

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
  yield takeLatest(REMOVE_FROM_APP_LAUNCHER, watchUpdateLauncherApps, 200);

  yield takeEvery(UPDATE_PASSWORD.REQUEST, watchUpdatePasswordRequest);
  yield takeEvery(UPDATE_PASSWORD.SUCCESS, callSuccessMetaCb);
  yield takeEvery(UPDATE_PASSWORD.ERROR, callErrorMetaCb);
  yield takeLatest([SET_AUTO_HIDE, SET_LAUNCHER_POSITION, SET_LAUNCHER_SIZE, SET_LAUNCHER_MONITOR_SETTINGS], reboundLauncherAndSaveSettings);
}
