import { all, call, Effect, put, select, takeEvery, takeLatest } from 'redux-saga/effects';

import { ManifestType } from '../../components/AppForm';
import ApiService from '../../services/ApiService';
import API from '../../services/ApiService/api';
import { Bounds, FinWindowV2 } from '../../types/commons';
import { ApiResponseStatus, AppStatusOrigins, AppStatusStates } from '../../types/enums';
import { UnPromisfy } from '../../types/utils';
import { getArea } from '../../utils/coordinateHelpers';
import { bindFinAppEventHandlers } from '../../utils/finAppEventHandlerHelpers';
import {
  closeApplication,
  getApplicationChildWindows,
  getApplicationInfo,
  getApplicationWindow,
  launchExternalProcess,
  startFromManifest,
} from '../../utils/finUtils';
import { getRuntimeVersion, reboundLauncher } from '../application';
import { getErrorFromCatch } from '../utils';
import { closeFinApp, externalApp, getAppDirectoryList, launchApp, openFinApp, setFinAppStatusState } from './actions';
import { getAppStatusById } from './selectors';

/**
 * Get window state for windows that are showing
 */
export const getVisibleWindowStateAndBounds = async (
  finWindow: FinWindowV2,
): Promise<{ finWindow: FinWindowV2; bounds: Bounds; isShowing: boolean; state: string }> => {
  const [isShowing, bounds, state] = await Promise.all([finWindow.isShowing(), finWindow.getBounds(), finWindow.getState()]);

  return { finWindow, bounds, state, isShowing };
};

export function* watchCloseFinAppRequest(action: ReturnType<typeof closeFinApp.request>) {
  try {
    yield call(closeApplication(action.payload));
    // success message to be dispatched from the system
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(closeFinApp.failure(error, action.meta));
  }
}

export function* watchGetAppDirectoryListRequest(action: ReturnType<typeof getAppDirectoryList.request>) {
  try {
    const response: UnPromisfy<ReturnType<typeof ApiService.getDirectoryAppList>> = yield call(ApiService.getDirectoryAppList);

    if (response.status === ApiResponseStatus.Failure) {
      throw new Error(response.message);
    }

    yield put(getAppDirectoryList.success(response.data, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(getAppDirectoryList.failure(error, action.meta));
  }
}

export function* watchGetAppDirectoryListSuccess(action: ReturnType<typeof getAppDirectoryList.success>) {
  try {
    yield put(reboundLauncher.request({ shouldAnimate: false, delay: 0 }));
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.log('Unknown error saga from:', action, 'Error:', error);
  }
}

export function* watchLaunchApp(action: ReturnType<typeof launchApp>) {
  try {
    const { manifestType } = action.payload;

    yield put(manifestType === ManifestType.Path ? externalApp.request(action.payload) : openFinApp.request(action.payload));
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.log('Unknown error saga from:', action, 'Error:', error);
  }
}

export function* watchExternalAppRequest(action: ReturnType<typeof externalApp.request>) {
  try {
    const { id, manifest_url } = action.payload;

    if (!manifest_url) {
      throw new Error('No manifest url');
    }

    const { uuid }: UnPromisfy<ReturnType<typeof launchExternalProcess>> = yield call(launchExternalProcess, { path: manifest_url });

    yield put(externalApp.success({ uuid }, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    const meta = action.meta || {};
    yield put(externalApp.failure(error, { ...meta, payload: action.payload }));
  }
}

// TODO: Add event listener for closing native app?

// export function* watchExternalAppSuccess(action: ReturnType<typeof externalApp.success>) {
//   try {

//   } catch (e) {
//     const error = getErrorFromCatch(e);
//     // tslint:disable-next-line:no-console
//     console.log('Unknown error saga from:', action, 'Error:', error);
//   }
// }

// export function* watchExternalAppFailure(action: ReturnType<typeof externalApp.failure>) {
//   try {

//   } catch (e) {
//     const error = getErrorFromCatch(e);
//     // tslint:disable-next-line:no-console
//     console.log('Error in watchOpenFinAppFailure', error);
//   }
// }

export function* watchOpenFinAppRequest(action: ReturnType<typeof openFinApp.request>) {
  try {
    const { appUrl, id, manifest_url, manifestType } = action.payload;

    let manifestUrl = manifest_url;

    if (appUrl) {
      // TODO: All apps should be moved off of appUrl and rely on manifest
      // Remove manifest creation through appUrl when all apps have been migrated off
      const runtimeVersion: ReturnType<typeof getRuntimeVersion> = yield select(getRuntimeVersion);

      manifestUrl = API.CREATE_MANIFEST_FROM_APP_URL(appUrl, undefined, runtimeVersion);
    }

    if (!manifestUrl) {
      throw new Error('No manifest url');
    }

    const status: ReturnType<typeof getAppStatusById> = yield select(getAppStatusById, id);

    if (!status || status.state === AppStatusStates.Closed) {
      yield put(setFinAppStatusState({ id, statusState: AppStatusStates.Loading, origin: AppStatusOrigins.Default }));
    }

    const app: UnPromisfy<ReturnType<typeof startFromManifest>> = yield call(startFromManifest, manifestUrl);
    const info: UnPromisfy<ReturnType<ReturnType<typeof getApplicationInfo>>> = yield call(getApplicationInfo(app.identity));

    yield put(
      openFinApp.success(
        {
          id,
          origin: AppStatusOrigins.Default,
          runtimeVersion: info && info.runtime ? (info as { runtime: { version: string } }).runtime.version : '',
          uuid: app.identity.uuid,
        },
        action.meta,
      ),
    );
  } catch (e) {
    const error = getErrorFromCatch(e);
    const meta = action.meta || {};
    yield put(openFinApp.failure(error, { ...meta, payload: action.payload }));
  }
}

export function* watchOpenFinAppSuccess(action: ReturnType<typeof openFinApp.success>) {
  try {
    const { payload } = action;
    const runtimeVersion: ReturnType<typeof getRuntimeVersion> = yield select(getRuntimeVersion);

    if (runtimeVersion.split('.')[0] !== payload.runtimeVersion.split('.')[0]) {
      yield put(setFinAppStatusState({ id: payload.id, statusState: AppStatusStates.Warning, message: 'Incompatible runtime' }));
      return;
    }

    bindFinAppEventHandlers(payload.uuid, payload.id);
    yield put(setFinAppStatusState({ id: payload.id, statusState: AppStatusStates.Running }));
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.log('Unknown error saga from:', action, 'Error:', error);
  }
}

export function* watchOpenFinAppFailure(action: ReturnType<typeof openFinApp.failure>) {
  try {
    const { message } = action.payload;
    const id = action.meta && action.meta.payload ? action.meta.payload.id : undefined;
    if (!id) {
      throw new Error('Failed to open fin app with unknown id');
    }

    const status: ReturnType<typeof getAppStatusById> = yield select(getAppStatusById, id);

    if (status && status.state === AppStatusStates.Loading) {
      yield put(setFinAppStatusState({ id, statusState: AppStatusStates.Closed }));
    }

    const alreadyRunningError = 'Application with specified UUID is already running: ';
    if (typeof message === 'string' && message.indexOf(alreadyRunningError) === 0) {
      const uuid = message.slice(alreadyRunningError.length);
      const appIdentity = { uuid };
      const [appWindow, childWindows]: [
        UnPromisfy<ReturnType<ReturnType<typeof getApplicationWindow>>>,
        UnPromisfy<ReturnType<ReturnType<typeof getApplicationChildWindows>>>
      ] = yield all([call(getApplicationWindow(appIdentity)), call(getApplicationChildWindows(appIdentity))]);

      const windows: Array<UnPromisfy<ReturnType<typeof getVisibleWindowStateAndBounds>>> = yield all([
        call(getVisibleWindowStateAndBounds, appWindow),
        ...childWindows.map(childWindow => call(getVisibleWindowStateAndBounds, childWindow)),
      ]);
      const largestWindowsFirst = windows
        .filter(win => win.isShowing)
        .sort((a, b) => {
          const areaA = getArea(a.bounds);
          const areaB = getArea(b.bounds);
          if (areaA === areaB) {
            return 0;
          }
          return areaA < areaB ? 1 : -1;
        });

      yield all(
        largestWindowsFirst.reduce(
          (acc, { finWindow, state }) => {
            if (!state) {
              return acc;
            }

            const method = state === 'minimized' ? 'restore' : 'bringToFront';
            return [...acc, call([finWindow, finWindow[method]])];
          },
          [] as Effect[],
        ),
      );
    }
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.warn('Error in watchOpenFinAppFailure', error);
  }
}

export function* appsSaga() {
  yield takeEvery(closeFinApp.request, watchCloseFinAppRequest);
  yield takeLatest(getAppDirectoryList.request, watchGetAppDirectoryListRequest);
  yield takeEvery(getAppDirectoryList.success, watchGetAppDirectoryListSuccess);
  yield takeEvery(openFinApp.request, watchOpenFinAppRequest);
  yield takeEvery(openFinApp.success, watchOpenFinAppSuccess);
  yield takeEvery(openFinApp.failure, watchOpenFinAppFailure);
  yield takeEvery(externalApp.request, watchExternalAppRequest);
  yield takeEvery(launchApp, watchLaunchApp);
}
