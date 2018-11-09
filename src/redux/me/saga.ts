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
  SET_LAUNCHBAR_POSITION,
  setMe,
} from './';

import { getPosition, getWindowById } from '../windows/selectors';
import { SET_AUTO_HIDE } from './actions';
import { getAutoHide } from './selectors';

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

  console.log('login', payload);

  const result = yield call(ApiService.login, payload);

  console.log('result', result);

  const { status } = result;

  if (status === 'ok') {
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

function setBoundsFactory(position, width, height, autoHide) {
  const launcherWindow = fin.desktop.Window.getCurrent();
  const currentScreenObj = launcherWindow.getNativeWindow().screen;

  let leftPosition;
  let topPosition;
  let autoHideDelta;

  const SHOW_LAUNCHER_ADJUSTMENT = 5;

  switch (position) {
    case 'RIGHT': {
      autoHideDelta = autoHide ? width - SHOW_LAUNCHER_ADJUSTMENT : 0;
      leftPosition = currentScreenObj.availWidth - width + autoHideDelta;
      topPosition = currentScreenObj.availHeight / 2 - height / 2;
      break;
    }
    case 'BOTTOM': {
      autoHideDelta = autoHide ? height - SHOW_LAUNCHER_ADJUSTMENT : 0;
      leftPosition = currentScreenObj.availWidth / 2 - width / 2;
      topPosition = currentScreenObj.height - height + autoHideDelta;
      break;
    }
    case 'LEFT': {
      autoHideDelta = autoHide ? width - SHOW_LAUNCHER_ADJUSTMENT : 0;
      leftPosition = 0 - autoHideDelta;
      topPosition = currentScreenObj.availHeight / 2 - height / 2;
      break;
    }
    default: {
      autoHideDelta = autoHide ? height - SHOW_LAUNCHER_ADJUSTMENT : 0;
      leftPosition = currentScreenObj.availWidth / 2 - width / 2;
      topPosition = currentScreenObj.height - currentScreenObj.availHeight - autoHideDelta;
    }
  }

  return launcherWindow.setBounds(leftPosition, topPosition, width, height);
}

export function* setLauncherBounds() {
  const autoHide = yield select(getAutoHide);
  // get bounds of launcher window
  const launchbarId = 'osLaunchpadMain';
  const state = yield select(getWindowById, launchbarId);
  const { width, height } = state.bounds;

  const largestDim = Math.max(width, height);
  const smallestDim = Math.min(width, height);

  // get position of launchbar from store
  const position = yield select(getPosition);

  switch (position) {
    case 'TOP':
      setBoundsFactory('TOP', largestDim, smallestDim, autoHide);
      break;
    case 'RIGHT':
      setBoundsFactory('RIGHT', smallestDim, largestDim, autoHide);
      break;
    case 'BOTTOM':
      setBoundsFactory('BOTTOM', largestDim, smallestDim, autoHide);
      break;
    case 'LEFT':
      setBoundsFactory('LEFT', smallestDim, largestDim, autoHide);
      break;
    default:
      setBoundsFactory('TOP', largestDim, smallestDim, autoHide);
  }
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
  yield takeLatest(SET_LAUNCHBAR_POSITION, setLauncherBounds);
  yield takeLatest(SET_AUTO_HIDE, setLauncherBounds);
}
