import { all, call, delay, put, race, select, take, takeEvery, takeLatest } from 'redux-saga/effects';

import windowsConfig, {
  APP_DIRECTORY_WINDOW,
  APP_LAUNCHER_OVERFLOW_WINDOW,
  CONTEXT_MENU,
  LAYOUTS_WINDOW,
  LOGIN_WINDOW,
  SETTINGS_MENU_WINDOW,
} from '../../config/windows';
import { UnPromisfy } from '../../types/utils';
import { getBoundsCenterInCoordinates, isBoundsInCoordinates } from '../../utils/coordinateHelpers';
import { createWindow, focusWindow, getWindowBounds, hideWindow, moveWindowTo, showWindow, updateWindowOptions } from '../../utils/finUtils';
import getOwnUuid from '../../utils/getOwnUuid';
import { getIsDragAndDrop, setWindowRelativeToLauncherBounds } from '../application';
import { getSettings } from '../me';
import { getMonitorDetailsDerivedByUserSettings } from '../selectors';
import { getMonitorDetails } from '../system';
import { getErrorFromCatch } from '../utils';
import {
  hideWindow as hideWindowActionCreator,
  launchWindow,
  openWindow,
  recoverLostWindows,
  toggleWindow,
  windowBlurred,
  windowBoundsChanged,
  windowHidden,
  windowShown,
} from './actions';
import { getWindowById, getWindowIsShowing, getWindows } from './selectors';

const APP_UUID = getOwnUuid();

function* watchHideWindowRequest(action: ReturnType<typeof hideWindowActionCreator.request>) {
  try {
    const { uuid, name } = action.payload;
    const identity = { uuid: uuid || getOwnUuid(), name };
    if (name === APP_LAUNCHER_OVERFLOW_WINDOW) {
      yield call(updateWindowOptions(identity), { opacity: 0 });
      yield put(windowHidden(identity));
    } else {
      yield call(hideWindow(identity));
    }
    yield put(hideWindowActionCreator.success());
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(hideWindowActionCreator.failure(error));
  }
}

function* watchLaunchWindow(action: ReturnType<typeof launchWindow>) {
  try {
    // tslint:disable-next-line:no-console
    console.log('Launch window called with', action);

    const { payload } = action;
    const { name } = payload;
    const window = yield select(getWindowById, name);

    if (window) {
      const identity = { uuid: APP_UUID, name };
      // fetch settings request on settings window
      if (name === windowsConfig.settings.name) {
        yield put(getSettings.request());
      }

      // App launcher overflow window will change opacity instead to avoid fade in/out effect
      if (name === APP_LAUNCHER_OVERFLOW_WINDOW) {
        yield call(updateWindowOptions(identity), { opacity: 1 });
        yield put(windowShown(identity));
      } else {
        yield call(showWindow(identity));
      }
      yield call(focusWindow(identity));
    } else {
      yield put(openWindow.request(payload));
    }
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.warn('Error in watchLaunchWindow', error);
  }
}

function* watchToggleWindow(action: ReturnType<typeof toggleWindow>) {
  try {
    const { name } = action.payload;
    const isWindowShowing: ReturnType<typeof getWindowIsShowing> = yield select(getWindowIsShowing, name);
    if (isWindowShowing) {
      yield put(hideWindowActionCreator.request({ name }));
      return;
    }

    const config = Object.values(windowsConfig).find(windowConfig => windowConfig.name === name);
    if (config) {
      yield put(launchWindow(config));
    }
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.warn('Error in watchToggleWindow', error);
  }
}

function* watchOpenWindowRequest(action: ReturnType<typeof openWindow.request>) {
  try {
    const finWindow: UnPromisfy<ReturnType<typeof createWindow>> = yield call(createWindow, action.payload);
    const bounds: UnPromisfy<ReturnType<typeof finWindow.getBounds>> = yield call([finWindow, finWindow.getBounds]);
    const { identity } = finWindow;
    const { name, uuid } = identity;

    if (name) {
      yield put(openWindow.success({ name, uuid, bounds }));
    } else {
      throw new Error(`Error in watchOpenWindowRequest, could not create window with config ${action.payload}`);
    }
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(openWindow.failure(error));
  }
}

function* watchOpenWindowSuccess(action: ReturnType<typeof openWindow.success>) {
  try {
    // tslint:disable-next-line:no-console
    console.log('Window Opened called with', action);

    const { name, uuid } = action.payload;

    if (name === APP_LAUNCHER_OVERFLOW_WINDOW || name === LAYOUTS_WINDOW || name === SETTINGS_MENU_WINDOW) {
      const bounds = yield call(getWindowBounds({ uuid, name: uuid }));
      if (bounds) {
        yield call(setWindowRelativeToLauncherBounds, name, bounds);
      }
    }

    if (name === LOGIN_WINDOW) {
      const identity = { name, uuid };
      yield call(showWindow(identity));
      yield call(focusWindow(identity));
    }
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.warn('Error in watchOpenWindowSuccess', error, action);
  }
}

function* watchWindowBoundsChanged(action: ReturnType<typeof windowBoundsChanged>) {
  try {
    const { bounds, identity } = action.payload;
    if (identity.name === getOwnUuid()) {
      yield all([
        call(setWindowRelativeToLauncherBounds, APP_LAUNCHER_OVERFLOW_WINDOW, bounds),
        call(setWindowRelativeToLauncherBounds, LAYOUTS_WINDOW, bounds),
        call(setWindowRelativeToLauncherBounds, SETTINGS_MENU_WINDOW, bounds),
      ]);
    }
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.warn('Error in watchWindowBoundsChanged', error, action);
  }
}

function* watchWindowBlurred(action: ReturnType<typeof windowBlurred>) {
  try {
    const { name } = action.payload;
    switch (name) {
      case CONTEXT_MENU: {
        yield put(hideWindowActionCreator.request({ name }));
        break;
      }
      case APP_LAUNCHER_OVERFLOW_WINDOW: {
        const isDragAndDropping = yield select(getIsDragAndDrop);
        if (!isDragAndDropping) {
          yield put(hideWindowActionCreator.request({ name }));
        }
        break;
      }
      case APP_DIRECTORY_WINDOW:
      case LAYOUTS_WINDOW:
      case SETTINGS_MENU_WINDOW: {
        const { proceed } = yield race({
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
          yield put(hideWindowActionCreator.request({ name }));
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
    console.warn('Error in watchWindowBlurred', error, action);
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
        const { bounds, name, uuid } = windowState;
        // Don't move the main window or windows that don't have registered bounds
        if (name === getOwnUuid() || !bounds) {
          return;
        }

        const foundMonitorDetails = monitorDetails.find(monitorDetail => isBoundsInCoordinates(bounds, monitorDetail.monitorRect));
        // If window is still within one of the monitors bounds
        // No need to do anything, bail
        if (foundMonitorDetails) {
          return;
        }

        // If monitor does not fall within one of the monitor bounds
        // Recover to where the launcher is
        const { left, top } = getBoundsCenterInCoordinates(bounds, availableRect);
        return call(moveWindowTo({ uuid, name }), left, top);
      }),
    );
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.warn('Error in watchRecoverLostWindows', error);
  }
}

export function* windowsSaga() {
  yield takeEvery(hideWindowActionCreator.request, watchHideWindowRequest);
  yield takeEvery(launchWindow, watchLaunchWindow);
  yield takeEvery(toggleWindow, watchToggleWindow);
  yield takeEvery(openWindow.request, watchOpenWindowRequest);
  yield takeEvery(openWindow.success, watchOpenWindowSuccess);
  yield takeEvery(windowBlurred, watchWindowBlurred);
  yield takeEvery(windowBoundsChanged, watchWindowBoundsChanged);
  yield takeLatest(recoverLostWindows, watchRecoverLostWindows);
}
