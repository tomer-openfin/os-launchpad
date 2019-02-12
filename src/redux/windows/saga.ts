import { Window } from '@giantmachines/redux-openfin';
import { delay } from 'redux-saga';
import { all, call, put, race, select, take, takeEvery, takeLatest } from 'redux-saga/effects';

import windowsConfig, {
  APP_DIRECTORY_WINDOW,
  APP_LAUNCHER_OVERFLOW_WINDOW,
  CONTEXT_MENU,
  LAYOUTS_WINDOW,
  LOGIN_WINDOW,
  LOGOUT_WINDOW,
} from '../../config/windows';
import { getBoundsCenterInCoordinates, isBoundsInCoordinates } from '../../utils/coordinateHelpers';
import getAppUuid from '../../utils/getAppUuid';
import { getFinWindowByName } from '../../utils/getLauncherFinWindow';
import { updateWindowOptions } from '../../utils/openfinPromises';
import { expandApp, getApplicationIsExpanded, getIsDragAndDrop, setIsDrawerExpanded, setWindowRelativeToLauncherBounds } from '../application';
import { getMonitorDetailsDerivedByUserSettings } from '../selectors';
import { getMonitorDetails } from '../system';
import {
  HIDE_WINDOW,
  hideWindow,
  LAUNCH_WINDOW,
  launchWindow,
  RECOVER_LOST_WINDOWS,
  TOGGLE_WINDOW,
  WINDOW_BLURRED,
  WINDOW_HIDDEN,
  WINDOW_SHOWN,
} from './actions';
import { getLauncherIsForceExpanded, getWindowBounds, getWindowById, getWindowIsShowing, getWindows } from './selectors';
import { HideWindowAction, LaunchWindowAction, ToggleWindowAction, WindowBlurredAction } from './types';

function* watchHideWindow(action: HideWindowAction) {
  const { payload } = action;
  if (!payload) {
    return;
  }

  const { name } = payload;
  if (name === APP_LAUNCHER_OVERFLOW_WINDOW) {
    const finWindow = yield call(getFinWindowByName, name);
    if (finWindow) {
      yield call(updateWindowOptions, finWindow, { opacity: 0 });
    }
  } else {
    yield put(Window.hideWindow({ id: name }));
  }
}

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

    // App launcher overflow window will change opacity instead to avoid fade in/out effect
    if (id === APP_LAUNCHER_OVERFLOW_WINDOW) {
      yield call(updateWindowOptions, finWindow, { opacity: 1 });
    } else {
      yield put(Window.showWindow({ id }));
    }
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

  if (id === APP_LAUNCHER_OVERFLOW_WINDOW || id === LAYOUTS_WINDOW || id === LOGOUT_WINDOW) {
    const bounds = yield select(getWindowBounds, getAppUuid());
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
  if (id === getAppUuid()) {
    yield all([
      call(setWindowRelativeToLauncherBounds, APP_LAUNCHER_OVERFLOW_WINDOW, bounds),
      call(setWindowRelativeToLauncherBounds, LAYOUTS_WINDOW, bounds),
      call(setWindowRelativeToLauncherBounds, LOGOUT_WINDOW, bounds),
    ]);
  }
}

function* watchToggleWindow(action: ToggleWindowAction) {
  const { payload } = action;
  if (!payload) {
    return;
  }

  const { name } = payload;
  const isWindowShowing = yield select(getWindowIsShowing, name);
  if (isWindowShowing) {
    yield put(hideWindow(name));
    return;
  }

  const config = Object.values(windowsConfig).find(windowConfig => windowConfig.name === name);
  if (config) {
    yield put(launchWindow(config));
  }
}

function* watchWindowBlurred(action: WindowBlurredAction) {
  const { payload } = action;
  if (!payload) {
    return;
  }

  const { name } = payload;
  switch (name) {
    case getAppUuid(): {
      const { cancel, proceed } = yield race({
        cancel: take(fluxStandardAction => {
          const { type, payload: standardPayload } = fluxStandardAction;
          return type === TOGGLE_WINDOW && standardPayload && (standardPayload.name === LAYOUTS_WINDOW || standardPayload.name === LOGOUT_WINDOW);
        }),
        proceed: delay(100),
      });

      if (cancel) {
        return;
      }

      const [isLayoutsShowing, isLogoutShowing] = yield all([select(getWindowIsShowing, LAYOUTS_WINDOW), select(getWindowIsShowing, LOGOUT_WINDOW)]);
      if (!isLayoutsShowing && !isLogoutShowing) {
        yield put(setIsDrawerExpanded(false));
      }
      break;
    }
    case CONTEXT_MENU: {
      yield put(hideWindow(name));
      break;
    }
    case APP_LAUNCHER_OVERFLOW_WINDOW: {
      const isDragAndDropping = yield select(getIsDragAndDrop);
      if (!isDragAndDropping) {
        yield put(hideWindow(name));
      }
      break;
    }
    case APP_DIRECTORY_WINDOW:
    case LAYOUTS_WINDOW:
    case LOGOUT_WINDOW: {
      const { cancel, proceed } = yield race({
        cancel: take(fluxStandardAction => {
          const { type, payload: standardPayload } = fluxStandardAction;
          return (type === TOGGLE_WINDOW || type === WINDOW_SHOWN || type === WINDOW_HIDDEN) && standardPayload && standardPayload.name === name;
        }),
        proceed: delay(100),
      });

      if (proceed) {
        yield put(hideWindow(name));
      }
      break;
    }
    default: {
      return;
    }
  }
}

function* watchWindowShown() {
  const isExpanded = yield select(getApplicationIsExpanded);
  const isForceExpanded = yield select(getLauncherIsForceExpanded);

  if (!isExpanded && isForceExpanded) {
    yield put(expandApp());
  }
}

function* watchRecoverLostWindows() {
  const monitorDetails: ReturnType<typeof getMonitorDetails> = yield select(getMonitorDetails);
  const launcherMonitorDetails: ReturnType<typeof getMonitorDetailsDerivedByUserSettings> = yield select(getMonitorDetailsDerivedByUserSettings);
  if (!monitorDetails.length || !launcherMonitorDetails) {
    return;
  }

  const { availableRect } = launcherMonitorDetails;
  const windows: ReturnType<typeof getWindows> = yield select(getWindows);
  yield all(
    windows.map(windowState => {
      // Don't move the main window
      if (windowState.id === getAppUuid()) {
        return;
      }

      const foundMonitorDetails = monitorDetails.find(monitorDetail => isBoundsInCoordinates(windowState.bounds, monitorDetail.monitorRect));
      // If window is still within one of the monitors bounds
      // No need to do anything, bail
      if (foundMonitorDetails) {
        return;
      }

      // If monitor does not fall within one of the monitor bounds
      // Recover to where the launcher is
      const { left, top } = getBoundsCenterInCoordinates(windowState.bounds, availableRect);
      return put(Window.moveWindow({ id: windowState.id, left, top }));
    }),
  );
}

export function* windowsSaga() {
  yield takeEvery(HIDE_WINDOW, watchHideWindow);
  yield takeEvery(LAUNCH_WINDOW, watchLaunchWindow);
  yield takeEvery(TOGGLE_WINDOW, watchToggleWindow);
  yield takeEvery(Window.WINDOW_OPENED, watchOpenedWindow);
  yield takeEvery(Window.BOUNDS_CHANGED, watchWindowBoundsChanged);
  yield takeEvery(WINDOW_BLURRED, watchWindowBlurred);
  yield takeEvery(WINDOW_SHOWN, watchWindowShown);
  yield takeLatest(RECOVER_LOST_WINDOWS, watchRecoverLostWindows);
}
