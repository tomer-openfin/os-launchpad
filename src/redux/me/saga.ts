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

import { APP_LAUNCHER_OVERFLOW_WINDOW, LAYOUTS_WINDOW, MAIN_WINDOW } from '../../config/windows';
import setWindowBounds from '../../utils/setWindowBounds';
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

  const result = yield call(ApiService.login, payload);

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

export function* setLauncherBounds() {
  const autoHide = yield select(getAutoHide);
  // get bounds of launcher window
  const windowId = MAIN_WINDOW;

  const windowState = yield select(getWindowById, windowId);

  const { width, height } = windowState.bounds;

  const largestDimension = Math.max(width, height);
  const smallestDimension = Math.min(width, height);

  // get position of launchbar from store
  const position = yield select(getPosition);

  switch (position) {
    case 'RIGHT':
      setWindowBounds(windowId, 'RIGHT', smallestDimension, largestDimension, 0, 0, autoHide);
      break;
    case 'BOTTOM':
      setWindowBounds(windowId, 'BOTTOM', largestDimension, smallestDimension, 0, 0, autoHide);
      break;
    case 'LEFT':
      setWindowBounds(windowId, 'LEFT', smallestDimension, largestDimension, 0, 0, autoHide);
      break;
    case 'TOP':
    default:
      setWindowBounds(windowId, 'TOP', largestDimension, smallestDimension, 0, 0, autoHide);
  }
}

export function* setAppOverflowWindowBounds() {
  // get bounds of launcher window
  const windowId = APP_LAUNCHER_OVERFLOW_WINDOW;

  const windowState = yield select(getWindowById, windowId);

  const { width, height } = windowState.bounds;

  const largestDimension = Math.max(width, height);
  const smallestDimension = Math.min(width, height);

  // get position of launchbar from store
  const position = yield select(getPosition);

  switch (position) {
    case 'RIGHT':
      setWindowBounds(windowId, 'RIGHT', largestDimension, smallestDimension, -63, 0);
      break;
    case 'BOTTOM':
      setWindowBounds(windowId, 'BOTTOM', smallestDimension, largestDimension, -63, 0);
      break;
    case 'LEFT':
      setWindowBounds(windowId, 'LEFT', largestDimension, smallestDimension, -63, 0);
      break;
    case 'TOP':
    default:
      setWindowBounds(windowId, 'TOP', smallestDimension, largestDimension, -63, 0);
  }
}

export function* setLayoutsWindowBounds() {
  // get bounds of launcher window
  const windowId = LAYOUTS_WINDOW;

  const windowState = yield select(getWindowById, windowId);

  const { width, height } = windowState.bounds;

  const largestDimension = Math.max(width, height);
  const smallestDimension = Math.min(width, height);

  // get position of launchbar from store
  const position = yield select(getPosition);

  switch (position) {
    case 'RIGHT':
      setWindowBounds(windowId, 'RIGHT', largestDimension, smallestDimension, 188, 45);
      break;
    case 'BOTTOM':
      setWindowBounds(windowId, 'BOTTOM', smallestDimension, largestDimension, 188, 45);
      break;
    case 'LEFT':
      setWindowBounds(windowId, 'LEFT', largestDimension, smallestDimension, 188, 45);
      break;
    case 'TOP':
    default:
      setWindowBounds(windowId, 'TOP', smallestDimension, largestDimension, 188, 45);
  }
}

function* watchSetLaunchbarPosition() {
  yield call(setLauncherBounds);
  yield call(setAppOverflowWindowBounds);
  yield call(setLayoutsWindowBounds);
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
  yield takeLatest(SET_LAUNCHBAR_POSITION, watchSetLaunchbarPosition);
  yield takeLatest(SET_AUTO_HIDE, setLauncherBounds);
}
