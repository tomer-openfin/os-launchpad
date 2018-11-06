import { Window } from '@giantmachines/redux-openfin';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import ApiService from '../../services/ApiService';
import { launchAppLauncher } from '../application';
import {
  GET_SETTINGS,
  getMeSettings,
  getSettingsSuccess,
  LOGIN,
  LoginError,
  loginError,
  LoginRequest,
  LoginSuccess,
  loginSuccess,
  SAVE_SETTINGS,
  saveSettingsSuccess,
  setMe,
} from './';

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

  const { email, password } = payload;

  if (email === 'test@test.com' && password === 'test') {
    yield put(loginSuccess({ email }));
  } else {
    yield put(loginError({ status: '401', message: 'LOGIN FAILED' }));
  }
}

function* watchLoginSuccess(action: LoginSuccess) {
  const { payload } = action;

  if (!payload) {
    return;
  }

  const { email } = payload;
  // tslint:disable-next-line:no-console
  console.log('Login Success for', email);
  yield put(setMe(email));
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
}
