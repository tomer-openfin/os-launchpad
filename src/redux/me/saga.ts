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

function setBoundsFactory(position, width, height) {
  const launcherWindow = fin.desktop.Window.getCurrent();
  const currentScreenObj = launcherWindow.getNativeWindow().screen;

  let leftPosition;
  let topPosition;

  switch (position) {
    case 'TOP':
      leftPosition = currentScreenObj.availWidth / 2 - width / 2;
      topPosition = currentScreenObj.height - currentScreenObj.availHeight;
      break;
    case 'RIGHT':
      leftPosition = currentScreenObj.availWidth - width;
      topPosition = currentScreenObj.availHeight / 2 - height / 2;
      break;
    case 'BOTTOM':
      leftPosition = currentScreenObj.availWidth / 2 - width / 2;
      topPosition = currentScreenObj.height - height;
      break;
    case 'LEFT':
      leftPosition = 0;
      topPosition = currentScreenObj.availHeight / 2 - height / 2;
      break;
    default:
      leftPosition = currentScreenObj.availWidth / 2 - width / 2;
      topPosition = currentScreenObj.height - currentScreenObj.availHeight;
  }

  return launcherWindow.setBounds(leftPosition, topPosition, width, height);
}

export function* setLauncherBounds() {
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
      setBoundsFactory('TOP', largestDim, smallestDim);
      break;
    case 'RIGHT':
      setBoundsFactory('RIGHT', smallestDim, largestDim);
      break;
    case 'BOTTOM':
      setBoundsFactory('BOTTOM', largestDim, smallestDim);
      break;
    case 'LEFT':
      setBoundsFactory('LEFT', smallestDim, largestDim);
      break;
    default:
      setBoundsFactory('TOP', largestDim, smallestDim);
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
}
