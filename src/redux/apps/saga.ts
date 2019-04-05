import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';

import ApiService from '../../services/ApiService';
import API from '../../services/ApiService/api';
import { ApiResponseStatus, AppStatusOrigins, AppStatusStates } from '../../types/enums';
import { UnPromisfy } from '../../types/utils';
import { getArea } from '../../utils/coordinateHelpers';
import { bindFinAppEventHandlers } from '../../utils/finAppEventHandlerHelpers';
import {
  closeApplication,
  createAndRunFromManifest,
  getOpenFinApplicationChildWindows,
  getOpenFinApplicationInfo,
  getVisibleWindowStateAndBounds,
  wrapApplication,
  wrapWindow,
} from '../../utils/openfinPromises';
import promisifyOpenfin from '../../utils/promisifyOpenfin';
import { getRuntimeVersion, reboundLauncher } from '../application';
import { getErrorFromCatch } from '../utils';
import { closeFinApp, getAppDirectoryList, openFinApp, setFinAppStatusState } from './actions';
import { getAppStatusById } from './selectors';

export function* watchCloseFinAppRequest(action: ReturnType<typeof closeFinApp.request>) {
  try {
    const { uuid } = action.payload;
    const app: UnPromisfy<ReturnType<typeof wrapApplication>> = yield call(wrapApplication, uuid);
    yield call(closeApplication, app);
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

export function* watchOpenFinAppRequest(action: ReturnType<typeof openFinApp.request>) {
  try {
    const { appUrl, id, manifest_url } = action.payload;

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
    const uuid: UnPromisfy<ReturnType<typeof createAndRunFromManifest>> = yield call(createAndRunFromManifest, manifestUrl, id);
    const info = yield call(getOpenFinApplicationInfo(uuid));

    yield put(
      openFinApp.success({ id, uuid, origin: AppStatusOrigins.Default, runtimeVersion: info && info.runtime ? info.runtime.version : '' }, action.meta),
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

    const { fin } = window;
    if (fin) {
      const alreadyRunningError = 'Application with specified UUID is already running: ';
      if (typeof message === 'string' && message.indexOf(alreadyRunningError) === 0) {
        const uuid = message.slice(alreadyRunningError.length);
        const app = fin.desktop.Application.wrap(uuid);
        const appWindow = app.getWindow();
        const childWindows: UnPromisfy<ReturnType<ReturnType<typeof getOpenFinApplicationChildWindows>>> = yield call(getOpenFinApplicationChildWindows(uuid));
        const finChildWindows: Array<UnPromisfy<ReturnType<typeof wrapWindow>>> = yield all(childWindows.map(childWindow => call(wrapWindow, childWindow)));

        const windows = yield all([
          call(getVisibleWindowStateAndBounds, appWindow),
          ...finChildWindows.map(childWindow => call(getVisibleWindowStateAndBounds, childWindow)),
        ]);
        const largestWindowsFirst = windows.filter(win => win.bounds).sort((a, b) => getArea(a.bounds) < getArea(b.bounds));

        yield all(
          largestWindowsFirst.reduce((acc, { finWindow, state }) => {
            if (!state) {
              return acc;
            }

            const method = state === 'minimized' ? 'restore' : 'bringToFront';
            return [...acc, call(promisifyOpenfin, finWindow, method)];
          }, []),
        );
      }
    }
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.log('Error in watchOpenFinAppFailure', error);
  }
}

export function* appsSaga() {
  yield takeEvery(closeFinApp.request, watchCloseFinAppRequest);
  yield takeLatest(getAppDirectoryList.request, watchGetAppDirectoryListRequest);
  yield takeEvery(getAppDirectoryList.success, watchGetAppDirectoryListSuccess);
  yield takeEvery(openFinApp.request, watchOpenFinAppRequest);
  yield takeEvery(openFinApp.success, watchOpenFinAppSuccess);
  yield takeEvery(openFinApp.failure, watchOpenFinAppFailure);
}
