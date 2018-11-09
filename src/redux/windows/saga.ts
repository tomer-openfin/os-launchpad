import { Window } from '@giantmachines/redux-openfin';
import { put, select, takeLatest } from 'redux-saga/effects';

import { getWindowById, LAUNCH_WINDOW, LaunchWindow } from './';

function* watchLaunchWindow(action: LaunchWindow) {
  // tslint:disable-next-line:no-console
  console.log('Launch window called with', action);
  const { payload } = action;

  if (!payload) {
    // tslint:disable-next-line:no-console
    console.log('Failed to launch window with payload', payload);
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

export function* windowsSaga() {
  yield takeLatest(LAUNCH_WINDOW, watchLaunchWindow);
}
