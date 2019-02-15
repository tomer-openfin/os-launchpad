import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';

import ApiService from '../../services/ApiService';
import API from '../../services/ApiService/api';

import { AppStatusOrigins, AppStatusStates, ResponseStatus } from '../../types/enums';
import { CloseFinAppRequest, OpenFinAppError, OpenFinAppRequest, OpenFinAppSuccess } from './types';

import {
  closeApplication,
  createAndRunFromManifest,
  getOpenFinApplicationChildWindows,
  getOpenFinApplicationInfo,
  getVisibleWindowStateAndBounds,
  wrapApplication,
} from '../../utils/openfinPromises';

import { getArea } from '../../utils/coordinateHelpers';
import { bindFinAppEventHandlers } from '../../utils/finAppEventHandlerHelpers';
import promisifyOpenfin from '../../utils/promisifyOpenfin';
import { getRuntimeVersion, reboundLauncherRequest } from '../application';
import {
  CLOSE_FIN_APP,
  GET_APP_DIRECTORY_LIST,
  getAppDirectoryListError,
  getAppDirectoryListSuccess,
  OPEN_FIN_APP,
  openFinAppError,
  openFinAppSuccess,
  setFinAppStatusState,
} from './actions';
import { getAppStatusById } from './selectors';

function* watchGetAppDirectoryListRequest() {
  const response = yield call(ApiService.getDirectoryAppList);

  if (response.length && response.status !== ResponseStatus.FAILURE) {
    const appList = response;

    yield put(getAppDirectoryListSuccess(appList));
  } else {
    yield put(getAppDirectoryListError());
  }
}

function* watchOpenFinAppError(action: OpenFinAppError) {
  const { payload } = action;
  if (!payload) {
    return;
  }

  const { id, message } = payload;
  const status = yield select(getAppStatusById, id);

  if (status && status.state === AppStatusStates.Loading) {
    yield put(setFinAppStatusState({ id, statusState: AppStatusStates.Closed }));
  }

  try {
    const { fin } = window;

    if (fin) {
      const alreadyRunningError = 'Application with specified UUID is already running: ';
      if (typeof message === 'string' && message.indexOf(alreadyRunningError) === 0) {
        const uuid = message.slice(alreadyRunningError.length);
        const app = fin.desktop.Application.wrap(uuid);
        const appWindow = app.getWindow();
        const childWindows = yield call(getOpenFinApplicationChildWindows(uuid));

        const windows = yield all([
          call(getVisibleWindowStateAndBounds, appWindow),
          ...childWindows.map(childWindow => call(getVisibleWindowStateAndBounds, childWindow)),
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
    // tslint:disable-next-line:no-console
    console.log('Error on bringing windows to front', e);
  }
}

function* watchOpenFinAppRequest(action: OpenFinAppRequest) {
  const { payload } = action;

  if (!payload) return;

  const { appUrl, id, manifest_url } = payload;

  let manifestUrl = manifest_url;

  if (appUrl) {
    // TODO: All apps should be moved off of appUrl and rely on manifest
    // Remove manifest creation through appUrl when all apps have been migrated off
    const runtimeVersion = yield select(getRuntimeVersion);

    manifestUrl = API.CREATE_MANIFEST(appUrl, undefined, runtimeVersion);
  }

  if (!manifestUrl) {
    return;
  }

  const status = yield select(getAppStatusById, id);

  if (!status || status.state === AppStatusStates.Closed) {
    yield put(setFinAppStatusState({ id, statusState: AppStatusStates.Loading, origin: AppStatusOrigins.Default }));
  }

  try {
    const uuid = yield call(createAndRunFromManifest, manifestUrl, id);
    const info = yield call(getOpenFinApplicationInfo(uuid));

    yield put(openFinAppSuccess({ id, uuid, origin: AppStatusOrigins.Default, runtimeVersion: info && info.runtime ? info.runtime.version : '' }));
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.log('Error running app:', payload, '\n', e);

    yield put(openFinAppError({ id, message: e }));
  }
}

function* watchOpenFinAppSuccess(action: OpenFinAppSuccess) {
  const { fin, store } = window;
  const { payload } = action;
  if (!payload || !fin || !store) {
    return;
  }

  const runtimeVersion = yield select(getRuntimeVersion);

  if (runtimeVersion.split('.')[0] !== payload.runtimeVersion.split('.')[0]) {
    yield put(setFinAppStatusState({ id: payload.id, statusState: AppStatusStates.Warning, message: 'Incompatible runtime' }));
    return;
  }

  bindFinAppEventHandlers(store.dispatch, payload.uuid, payload.id);
  yield put(setFinAppStatusState({ id: payload.id, statusState: AppStatusStates.Running }));
}

function* watchCloseFinAppRequest(action: CloseFinAppRequest) {
  const { payload } = action;
  if (!payload) {
    return;
  }

  const { uuid } = payload;
  try {
    const app = yield call(wrapApplication, uuid);

    yield call(closeApplication, app);
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.log('Failed to close app with uuid:', uuid, '\n', e);
  }
}

function* watchGetAppDirectoryListSuccess() {
  yield put(reboundLauncherRequest(false, 0));
}

export function* appsSaga() {
  yield takeEvery(CLOSE_FIN_APP.REQUEST, watchCloseFinAppRequest);
  yield takeEvery(OPEN_FIN_APP.REQUEST, watchOpenFinAppRequest);
  yield takeEvery(OPEN_FIN_APP.SUCCESS, watchOpenFinAppSuccess);
  yield takeEvery(OPEN_FIN_APP.ERROR, watchOpenFinAppError);
  yield takeEvery(GET_APP_DIRECTORY_LIST.SUCCESS, watchGetAppDirectoryListSuccess);
  yield takeLatest(GET_APP_DIRECTORY_LIST.REQUEST, watchGetAppDirectoryListRequest);
}
