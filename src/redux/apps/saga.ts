import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';

import ApiService from '../../services/ApiService';
import API from '../../services/ApiService/api';

import { AppStatusOrigins, AppStatusStates, ResponseStatus } from '../../types/enums';
import { CloseFinAppRequest, OpenFinAppError, OpenFinAppRequest, OpenFinAppSuccess } from './types';

import { closeApplication, createAndRunFromManifest, getOpenFinApplicationInfo, wrapApplication } from '../../utils/openfinPromises';

import { bindFinAppEventHandlers } from '../../utils/finAppEventHandlerHelpers';
import { getRuntimeVersion, reboundLauncherRequest } from '../application';
import {
  CLOSE_FIN_APP,
  GET_APP_DIRECTORY_LIST,
  OPEN_FIN_APP,
  openFinAppError,
  openFinAppSuccess,
  SET_APP_DIRECTORY_LIST,
  setAppDirectoryList,
  setFinAppStatusState,
} from './actions';
import { getAppStatusById } from './selectors';

function* watchGetAppDirectoryList() {
  const response = yield call(ApiService.getDirectoryAppList);

  if (response.length && response.status !== ResponseStatus.FAILURE) {
    const appList = response;

    yield put(setAppDirectoryList(appList));
  }
}

function* watchOpenFinAppError(action: OpenFinAppError) {
  const { payload } = action;
  if (!payload) {
    return;
  }

  const { id } = payload;
  const status = yield select(getAppStatusById, id);

  if (status && status.state === AppStatusStates.Loading) {
    yield put(setFinAppStatusState({ id, statusState: AppStatusStates.Closed }));
  }
}

function* watchOpenFinAppRequest(action: OpenFinAppRequest) {
  const { payload } = action;

  if (!payload) return;

  const { appUrl, id, manifest_url } = payload;

  let manifestUrl;

  if (manifest_url) {
    manifestUrl = manifest_url;
  } else if (appUrl) {
    const runtimeVersion = yield select(getRuntimeVersion);

    if (!runtimeVersion) return;

    manifestUrl = API.CREATE_MANIFEST(runtimeVersion, appUrl, process.env.API_URL || `${window.location.origin}/`);
  } else return;

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

    yield put(openFinAppError({ id }));
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

function* watchSetAppDirectoryList() {
  yield put(reboundLauncherRequest(false, 0));
}

export function* appsSaga() {
  yield takeEvery(CLOSE_FIN_APP.REQUEST, watchCloseFinAppRequest);
  yield takeEvery(OPEN_FIN_APP.REQUEST, watchOpenFinAppRequest);
  yield takeEvery(OPEN_FIN_APP.SUCCESS, watchOpenFinAppSuccess);
  yield takeEvery(OPEN_FIN_APP.ERROR, watchOpenFinAppError);
  yield takeEvery(SET_APP_DIRECTORY_LIST, watchSetAppDirectoryList);
  yield takeLatest(GET_APP_DIRECTORY_LIST, watchGetAppDirectoryList);
}
