import { Window } from '@giantmachines/redux-openfin';
import { delay } from 'redux-saga';
import { all, call, put, select, takeEvery } from 'redux-saga/effects';

import { APP_LAUNCHER_OVERFLOW_WINDOW, LAYOUTS_WINDOW, LOGIN_WINDOW } from '../../config/windows';
import getAppUuid from '../../utils/getAppUuid';
import { getFinWindowByName } from '../../utils/getLauncherFinWindow';
import { hideWindowPromise } from '../../utils/openfinPromises';
import { expandApp, getApplicationIsExpanded, getBlurringWindowByName, setBlurringWindow, setWindowRelativeToLauncherBounds } from '../application';
import { BLUR_WINDOW_WITH_DELAY, LAUNCH_WINDOW, WINDOW_SHOWN } from './actions';
import { getLauncherIsForceExpanded, getWindowBounds, getWindowById } from './selectors';
import { BlurWindowWithDelayAction, LaunchWindowAction } from './types';

const APP_UUID = getAppUuid();

function* watchLaunchWindow(action: LaunchWindowAction) {
  // tslint:disable-next-line:no-console
  console.log('Launch window called with', action);

  const { payload } = action;

  if (!payload) {
    // tslint:disable-next-line:no-console
    console.log('Failed to launch window with action', action);
    return;
  }

  const id = payload.name;
  const window = yield select(getWindowById, id);

  if (window) {
    const finWindow = yield call(getFinWindowByName, id);
    const isBlurring = yield select(getBlurringWindowByName, id);
    if (!!isBlurring || !finWindow) {
      return;
    }

    yield put(Window.showWindow({ id }));
    yield put(Window.focusWindow({ id }));
  } else {
    yield put(Window.openWindow(payload));
  }
}

function* watchOpenedWindow(action) {
  // tslint:disable-next-line:no-console
  console.log('Window Opened called with', action);

  const { payload } = action;

  if (!payload) {
    // tslint:disable-next-line:no-console
    console.log('Failed to Open window with action', action);
    return;
  }

  const { options } = payload;

  if (!options) {
    // tslint:disable-next-line:no-console
    console.log('Failed to Open window on missing "option" key on "payload" object with action', action, 'and payload', payload);
    return;
  }

  const { id } = options;

  if (!id) {
    // tslint:disable-next-line:no-console
    console.log('Failed to Open window on missing "id" key on "options" object with action', action, 'and options', options);
    return;
  }

  const window = yield select(getWindowById, id);

  if (!window) {
    // tslint:disable-next-line:no-console
    console.log('Failed to Open window - unable to get window by id - with action', action, 'and id', id);
    return;
  }

  if (id === APP_LAUNCHER_OVERFLOW_WINDOW || id === LAYOUTS_WINDOW) {
    const bounds = yield select(getWindowBounds, APP_UUID);
    if (bounds) {
      yield call(setWindowRelativeToLauncherBounds, id, bounds);
    }
  }

  if (id === LOGIN_WINDOW) {
    yield put(Window.showWindow({ ...window }));
    yield put(Window.focusWindow({ ...window }));
  }
}

function* watchWindowBoundsChanged(action) {
  const { bounds, id } = action.payload.options;
  if (id === APP_UUID) {
    yield all([call(setWindowRelativeToLauncherBounds, APP_LAUNCHER_OVERFLOW_WINDOW, bounds), call(setWindowRelativeToLauncherBounds, LAYOUTS_WINDOW, bounds)]);
  }
}

function* watchBlurWindowWithDelay(action: BlurWindowWithDelayAction) {
  const { payload } = action;
  if (!payload) {
    return;
  }

  const { name } = payload;
  const finWindow = yield call(getFinWindowByName, name);
  if (!finWindow) {
    return;
  }

  yield put(setBlurringWindow(name, true));
  yield all([call(hideWindowPromise, finWindow), delay(50)]);
  yield put(setBlurringWindow(name, false));
}

function* watchWindowShown() {
  const isExpanded = yield select(getApplicationIsExpanded);
  const isForceExpanded = yield select(getLauncherIsForceExpanded);

  if (!isExpanded && isForceExpanded) {
    yield put(expandApp());
  }
}

export function* windowsSaga() {
  yield takeEvery(BLUR_WINDOW_WITH_DELAY, watchBlurWindowWithDelay);
  yield takeEvery(LAUNCH_WINDOW, watchLaunchWindow);
  yield takeEvery(Window.WINDOW_OPENED, watchOpenedWindow);
  yield takeEvery(Window.BOUNDS_CHANGED, watchWindowBoundsChanged);
  yield takeEvery(WINDOW_SHOWN, watchWindowShown);
}
