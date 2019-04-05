import { Window } from '@giantmachines/redux-openfin';
import { all, call, delay, put, race, select, take, takeEvery, takeLatest } from 'redux-saga/effects';

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
import { getErrorFromCatch } from '../utils';
import { hideWindow, launchWindow, recoverLostWindows, toggleWindow, windowBlurred, windowHidden, windowShown } from './actions';
import { getLauncherIsForceExpanded, getWindowBounds, getWindowById, getWindowIsShowing, getWindows } from './selectors';

function* watchHideWindow(action: ReturnType<typeof hideWindow>) {
  try {
    const { name } = action.payload;
    if (name === APP_LAUNCHER_OVERFLOW_WINDOW) {
      const finWindow = yield call(getFinWindowByName, name);
      if (finWindow) {
        yield call(updateWindowOptions, finWindow, { opacity: 0 });
        yield put(windowHidden({ name }));
      }
    } else {
      yield put(Window.hideWindow({ id: name }));
    }
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.log('Error in watchHideWindow', error);
  }
}

function* watchLaunchWindow(action: ReturnType<typeof launchWindow>) {
  try {
    // tslint:disable-next-line:no-console
    console.log('Launch window called with', action);

    const { payload } = action;
    const id = payload.name;
    const window = yield select(getWindowById, id);

    if (window) {
      const finWindow = yield call(getFinWindowByName, id);

      // App launcher overflow window will change opacity instead to avoid fade in/out effect
      if (id === APP_LAUNCHER_OVERFLOW_WINDOW) {
        yield call(updateWindowOptions, finWindow, { opacity: 1 });
        yield put(windowShown({ name: id }));
      } else {
        yield put(Window.showWindow({ id }));
      }
      yield put(Window.focusWindow({ id }));
    } else {
      yield put(Window.openWindow(payload));
    }
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.log('Error in watchLaunchWindow', error);
  }
}

function* watchToggleWindow(action: ReturnType<typeof toggleWindow>) {
  try {
    const { name } = action.payload;
    const isWindowShowing: ReturnType<typeof getWindowIsShowing> = yield select(getWindowIsShowing, name);
    if (isWindowShowing) {
      yield put(hideWindow({ name }));
      return;
    }

    const config = Object.values(windowsConfig).find(windowConfig => windowConfig.name === name);
    if (config) {
      yield put(launchWindow(config));
    }
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.log('Error in watchToggleWindow', error);
  }
}

function* watchOpenedWindow(action) {
  try {
    // tslint:disable-next-line:no-console
    console.log('Window Opened called with', action);

    const { payload } = action;
    if (!payload) {
      throw new Error('Action contained no payload');
    }

    const { options } = payload;
    if (!options) {
      throw new Error('Failed to Open window on missing "option" key on "payload" object');
    }

    const { id } = options;
    if (!id) {
      throw new Error('Failed to Open window on missing "id" key on "options" object');
    }

    const window = yield select(getWindowById, id);
    if (!window) {
      throw new Error('Failed to Open window - unable to get window by id');
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
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.log('Error in watchOpenedWindow', error, action);
  }
}

function* watchWindowBoundsChanged(action) {
  try {
    const { bounds, id } = action.payload.options;
    if (id === getAppUuid()) {
      yield all([
        call(setWindowRelativeToLauncherBounds, APP_LAUNCHER_OVERFLOW_WINDOW, bounds),
        call(setWindowRelativeToLauncherBounds, LAYOUTS_WINDOW, bounds),
        call(setWindowRelativeToLauncherBounds, LOGOUT_WINDOW, bounds),
      ]);
    }
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.log('Error in watchWindowBoundsChanged', error, action);
  }
}

function* watchWindowBlurred(action: ReturnType<typeof windowBlurred>) {
  try {
    const { name } = action.payload;
    switch (name) {
      case getAppUuid(): {
        const { cancel, proceed } = yield race({
          cancel: take(fluxStandardAction => {
            const { type, payload: standardPayload } = fluxStandardAction;
            return type === toggleWindow.toString() && standardPayload && (standardPayload.name === LAYOUTS_WINDOW || standardPayload.name === LOGOUT_WINDOW);
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
        yield put(hideWindow({ name }));
        break;
      }
      case APP_LAUNCHER_OVERFLOW_WINDOW: {
        const isDragAndDropping = yield select(getIsDragAndDrop);
        if (!isDragAndDropping) {
          yield put(hideWindow({ name }));
        }
        break;
      }
      case APP_DIRECTORY_WINDOW:
      case LAYOUTS_WINDOW:
      case LOGOUT_WINDOW: {
        const { cancel, proceed } = yield race({
          cancel: take(fluxStandardAction => {
            const { type, payload: standardPayload } = fluxStandardAction;
            return (
              (type === toggleWindow.toString() || type === windowShown.toString() || type === windowHidden.toString()) &&
              standardPayload &&
              standardPayload.name === name
            );
          }),
          proceed: delay(100),
        });

        if (proceed) {
          yield put(hideWindow({ name }));
        }
        break;
      }
      default: {
        return;
      }
    }
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.log('Error in watchWindowBlurred', error, action);
  }
}

function* watchWindowShown(action: ReturnType<typeof windowShown>) {
  try {
    if (action.payload.name === getAppUuid() || action.payload.name === APP_LAUNCHER_OVERFLOW_WINDOW) {
      return;
    }

    const isExpanded: ReturnType<typeof getApplicationIsExpanded> = yield select(getApplicationIsExpanded);
    const isForceExpanded: ReturnType<typeof getLauncherIsForceExpanded> = yield select(getLauncherIsForceExpanded);

    if (!isExpanded && isForceExpanded) {
      yield put(expandApp());
    }
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.log('Error in watchWindowShown', error);
  }
}

function* watchRecoverLostWindows() {
  try {
    const monitorDetails: ReturnType<typeof getMonitorDetails> = yield select(getMonitorDetails);
    const launcherMonitorDetails: ReturnType<typeof getMonitorDetailsDerivedByUserSettings> = yield select(getMonitorDetailsDerivedByUserSettings);
    if (!monitorDetails.length || !launcherMonitorDetails) {
      throw new Error('monitorDetails and launcherMonitorDetails are required to recover windows');
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
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.log('Error in watchRecoverLostWindows', error);
  }
}

export function* windowsSaga() {
  yield takeEvery(hideWindow, watchHideWindow);
  yield takeEvery(launchWindow, watchLaunchWindow);
  yield takeEvery(toggleWindow, watchToggleWindow);
  yield takeEvery(Window.WINDOW_OPENED, watchOpenedWindow);
  yield takeEvery(Window.BOUNDS_CHANGED, watchWindowBoundsChanged);
  yield takeEvery(windowBlurred, watchWindowBlurred);
  yield takeEvery(windowShown, watchWindowShown);
  yield takeLatest(recoverLostWindows, watchRecoverLostWindows);
}
