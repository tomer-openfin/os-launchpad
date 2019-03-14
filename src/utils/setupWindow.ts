import { Window } from '@giantmachines/redux-openfin';
import { put } from 'redux-saga/effects';

import { APP_LAUNCHER_OVERFLOW_WINDOW } from '../config/windows';
import { windowBlurred, windowHidden, windowShown } from '../redux/windows';
import { WindowBaseEvent } from '../types/fin';

const hiddenHandler = ({ name }: WindowBaseEvent) => {
  window.store.dispatch(windowHidden({ name }));
};
const shownHandler = ({ name }: WindowBaseEvent) => {
  window.store.dispatch(windowShown({ name }));
};
const blurredHandler = ({ name }: WindowBaseEvent) => {
  window.store.dispatch(windowBlurred({ name }));
};

export function* setupWindow(finName: string) {
  // Track every windows hide and show state
  yield put(Window.addWindowEventListener({ id: finName, listener: hiddenHandler, type: 'hidden' }));
  yield put(Window.addWindowEventListener({ id: finName, listener: shownHandler, type: 'shown' }));
  yield put(Window.addWindowEventListener({ id: finName, listener: blurredHandler, type: 'blurred' }));

  if (finName === APP_LAUNCHER_OVERFLOW_WINDOW) {
    yield put(windowHidden({ name: finName }));
  }
}
