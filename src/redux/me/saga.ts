import { Window } from '@giantmachines/redux-openfin';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { APP_LAUNCHER_OVERFLOW_WINDOW, LAYOUTS_WINDOW, MAIN_WINDOW } from '../../config/windows';
import ApiService from '../../services/ApiService';
import { isTopOrBottom } from '../../utils/launcherPosition';
import setWindowBounds from '../../utils/setWindowBounds';
import { launchAppLauncher } from '../application';
import { getPosition, getWindowById } from '../windows/selectors';
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
import { getAutoHide, getMeSettings } from './selectors';
import {
  LoginError,
  LoginRequest,
  LoginSuccess,
} from './types';

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

function* setWindowBoundsWatcher(windowId, offsetX, offsetY, autoHide = false, invert = false) {
  const [windowState, position] = yield all([
    select(getWindowById, windowId),
    select(getPosition),
  ]);

  const isTopOrBottomPosition = isTopOrBottom(position);
  const { width, height } = windowState.bounds;

  const largestDimension = Math.max(width, height);
  const smallestDimension = Math.min(width, height);
  // TODO - Find a better way to solve inverting
  const xDimension = (isTopOrBottomPosition && !invert) ? largestDimension : smallestDimension;
  const yDimension = (isTopOrBottomPosition && !invert) ? smallestDimension : largestDimension;

  // get position of launchbar from store
  setWindowBounds(windowId, position, xDimension, yDimension, offsetX, offsetY, autoHide);
}

export function* setLauncherBounds() {
  const autoHide = yield select(getAutoHide);
  yield call(setWindowBoundsWatcher, MAIN_WINDOW, 0, 0, autoHide);
}

export function* setAppOverflowWindowBounds() {
  yield call(setWindowBoundsWatcher, APP_LAUNCHER_OVERFLOW_WINDOW, -63, 0, false, true);
}

export function* setLayoutsWindowBounds() {
  yield call(setWindowBoundsWatcher, LAYOUTS_WINDOW, 188, 45, false, true);
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
  yield takeLatest(SET_LAUNCHER_POSITION, watchSetLaunchbarPosition);
  yield takeLatest(SET_AUTO_HIDE, setLauncherBounds);
}
