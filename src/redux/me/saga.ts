import { Window } from '@giantmachines/redux-openfin';
import { all, call, put, select, take, takeLatest } from 'redux-saga/effects';

import ApiService from '../../services/ApiService';

import { ResponseStatus } from '../../types/enums';
import { getAdminAppsRequest, getAdminUsersRequest } from '../admin';
import { launchAppLauncher, reboundLauncherRequest } from '../application';
import { getAppDirectoryList } from '../apps';
import { getLayoutsRequest } from '../layouts';
import { getAdminOrgSettingsRequest } from '../organization/index';
import {
  ADD_TO_APP_LAUNCHER,
  changePassword,
  GET_SETTINGS,
  getSettingsRequest,
  getSettingsSuccess,
  LOGIN,
  LOGIN_WITH_NEW_PASSWORD,
  loginError,
  loginSuccess,
  REMOVE_FROM_APP_LAUNCHER,
  SAVE_SETTINGS,
  saveSettingsRequest,
  saveSettingsSuccess,
  SET_AUTO_HIDE,
  SET_LAUNCHER_POSITION,
  setMe,
} from './actions';
import { getMeSettings } from './selectors';
import { LoginError, LoginRequest, LoginSuccess, LoginWithNewPassword } from './types';

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

function* watchGetSettingsRequest() {
  const result = yield call(ApiService.getUserSettings);

  // TODO validate result against settings state (e.g. invalid position issue)
  // if invalid fall back to defaults and save in api

  yield put(getSettingsSuccess(result));
}

function* watchGetSettingsSuccess() {
  yield put(reboundLauncherRequest(false));
}

function* watchSetAutoHide() {
  yield put(reboundLauncherRequest(false));

  yield put(saveSettingsRequest());
}

function* watchSetLaunchbarPosition() {
  yield put(reboundLauncherRequest(false));

  yield put(saveSettingsRequest());
}

function* watchSaveSettingsRequest() {
  const settings = yield select(getMeSettings);

  // TODO: error handling
  yield call(ApiService.saveUserSettings, settings);

  yield put(saveSettingsSuccess());
}

function* watchUpdateLauncherApps() {
  yield put(reboundLauncherRequest(true));

  yield put(saveSettingsRequest());
}

export function* meSaga() {
  yield takeLatest(GET_SETTINGS.REQUEST, watchGetSettingsRequest);
  yield takeLatest(GET_SETTINGS.SUCCESS, watchGetSettingsSuccess);
  yield takeLatest(LOGIN.REQUEST, watchLoginRequest);
  yield takeLatest(LOGIN.SUCCESS, watchLoginSuccess);
  yield takeLatest(LOGIN.ERROR, watchLoginError);
  yield takeLatest(LOGIN_WITH_NEW_PASSWORD, watchLoginWithNewPassword);
  yield takeLatest(SAVE_SETTINGS.REQUEST, watchSaveSettingsRequest);
  yield takeLatest(ADD_TO_APP_LAUNCHER, watchUpdateLauncherApps);
  yield takeLatest(REMOVE_FROM_APP_LAUNCHER, watchUpdateLauncherApps);
  yield takeLatest(SET_LAUNCHER_POSITION, watchSetLaunchbarPosition);
  yield takeLatest(SET_AUTO_HIDE, watchSetAutoHide);
}
