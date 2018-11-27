import { Window } from '@giantmachines/redux-openfin';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import ApiService from '../../services/ApiService';
import { launchAppLauncher, setLauncherBounds } from '../application';
import {
  GET_SETTINGS,
  getSettingsSuccess,
  LOGIN,
  loginError,
  loginSuccess,
  SAVE_SETTINGS,
  saveSettingsSuccess,
  SET_AUTO_HIDE,
  SET_LAUNCHER_POSITION,
  setMe,
} from './actions';
import { getMeSettings } from './selectors';
import { LoginError, LoginRequest, LoginSuccess } from './types';

function* watchGetSettingsRequest() {
  const result = yield call(ApiService.getSettings);

  yield put(getSettingsSuccess(result));
}

function* watchLoginRequest(action: LoginRequest) {
  // tslint:disable-next-line:no-console
  console.log('Login Request', action);

  const { payload } = action;

  if (!payload) {
    return;
  }
  const { email } = payload;

  const result = yield call(ApiService.login, payload);

  const { status } = result;

  if (!status) {
    yield put(loginSuccess({ token: 'success', email }));
  } else {
    yield put(loginError({ status, message: 'Login failed' }));
  }
}

function* watchLoginSuccess(action: LoginSuccess) {
  const { payload } = action;

  if (!payload) {
    return;
  }

  const { email } = payload;

  const { IS_ADMIN } = process.env;
  const isAdmin = IS_ADMIN === 'true';

  // tslint:disable-next-line:no-console
  console.log('Login Success for', email);

  // tslint:disable-next-line:no-console
  console.log('Is newly logged in user an admin?', isAdmin);

  yield put(setMe(isAdmin, email));
  // TODO: Use window config
  yield put(Window.closeWindow({ id: 'osLaunchpadLogin' }));

  yield put(launchAppLauncher());
}

function* watchLoginError(action: LoginError) {
  const { payload } = action;

  if (!payload) {
    return;
  }

  const { message } = payload;
  // tslint:disable-next-line:no-console
  console.log('Error Message:', message);
}

function* watchSaveSettingsRequest() {
  const settings = yield select(getMeSettings);
  yield call(ApiService.saveSettings, settings);
  yield put(saveSettingsSuccess());
}

export function* meSaga() {
  yield takeLatest(GET_SETTINGS.REQUEST, watchGetSettingsRequest);
  yield takeLatest(LOGIN.REQUEST, watchLoginRequest);
  yield takeLatest(LOGIN.SUCCESS, watchLoginSuccess);
  yield takeLatest(LOGIN.ERROR, watchLoginError);
  yield takeLatest(SAVE_SETTINGS.REQUEST, watchSaveSettingsRequest);
  yield takeLatest(SET_LAUNCHER_POSITION, setLauncherBounds);
  yield takeLatest(SET_AUTO_HIDE, setLauncherBounds);
}
