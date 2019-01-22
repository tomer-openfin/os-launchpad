import { Window } from '@giantmachines/redux-openfin';
import { put } from 'redux-saga/effects';

import { LAYOUTS_WINDOW } from '../config/windows';
import { setIsDrawerExpanded } from '../redux/application';
import { State } from '../redux/types';
import { windowHidden, windowShown } from '../redux/windows';
import { WindowBaseEvent } from '../types/fin';
import getAppUuid from './getAppUuid';

const hiddenHandler = ({ name }: WindowBaseEvent) => {
  window.store.dispatch(windowHidden(name));
};
const shownHandler = ({ name }: WindowBaseEvent) => {
  window.store.dispatch(windowShown(name));
};

/**
 * Main window specific setup.
 */
function* setupMainWindow(finName: string) {
  const blurredHandler = () => {
    window.setTimeout(() => {
      const { windows }: State = window.store.getState();
      const layoutWindow = windows.byId[LAYOUTS_WINDOW];
      if (!layoutWindow || !layoutWindow.isShowing) {
        window.store.dispatch(setIsDrawerExpanded(false));
      }
    }, 100);
  };

  yield put(Window.addWindowEventListener({ id: finName, listener: blurredHandler, type: 'blurred' }));
}

export function* setupWindow(finName: string) {
  // Track every windows hide and show state
  yield put(Window.addWindowEventListener({ id: finName, listener: hiddenHandler, type: 'hidden' }));
  yield put(Window.addWindowEventListener({ id: finName, listener: shownHandler, type: 'shown' }));

  // Window specific setup
  switch (finName) {
    case getAppUuid(): {
      yield setupMainWindow(finName);
      return;
    }
    default: {
      return;
    }
  }
}
