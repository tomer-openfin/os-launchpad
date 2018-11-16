import { Window } from '@giantmachines/redux-openfin';
import { put, select, takeLatest } from 'redux-saga/effects';

import { APP_LAUNCHER_OVERFLOW_WINDOW, LAYOUTS_WINDOW, LOGIN_WINDOW } from '../../config/windows';
import { setAppOverflowWindowBounds, setLayoutsWindowBounds } from '../me';
import { LAUNCH_WINDOW } from './actions';
import { getWindowById } from './selectors';
import { LaunchWindow } from './types';

function* watchLaunchWindow(action: LaunchWindow) {
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

  if (window.id === APP_LAUNCHER_OVERFLOW_WINDOW) {
    yield setAppOverflowWindowBounds();
  }

  if (window.id === LAYOUTS_WINDOW) {
    yield setLayoutsWindowBounds();
  }

  if (window.id === LOGIN_WINDOW) {
    yield put(Window.showWindow({ ...window }));
    yield put(Window.focusWindow({ ...window }));
  }
}

export function* windowsSaga() {
  yield takeLatest(LAUNCH_WINDOW, watchLaunchWindow);
  yield takeLatest(Window.WINDOW_OPENED, watchOpenedWindow);
}
