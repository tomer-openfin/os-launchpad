import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';

import ApiService from '../../services/ApiService';

import { ResponseStatus } from '../../types/enums';
import { closeApplication, createAndRunFromManifest, wrapApplication } from '../../utils/openfinPromises';
import { reboundLauncherRequest } from '../application/index';
import {
  CLOSE_FIN_APP,
  closeFinAppError,
  closeFinAppSuccess,
  GET_APP_DIRECTORY_LIST,
  OPEN_FIN_APP,
  openFinAppError,
  openFinAppSuccess,
  SET_APP_DIRECTORY_LIST,
  setAppDirectoryList,
  setFinAppStatusState,
} from './actions';
import { getAppStatusById } from './selectors';
import { AppStatusOrigins, AppStatusStates, CloseFinAppRequest, OpenFinAppRequest } from './types';

function* watchGetAppDirectoryList() {
  const response = yield call(ApiService.getDirectoryAppList);

  if (response.length && response.status !== ResponseStatus.FAILURE) {
    const appList = response;

    yield put(setAppDirectoryList(appList));
  }
}

function* watchOpenFinAppRequest(action: OpenFinAppRequest) {
  const { payload } = action;

  if (!payload) return;

  const { id, manifest_url: manifestUrl } = payload;
  const status = yield select(getAppStatusById, id);

  if (status && (status.state === AppStatusStates.Loading || status.state === AppStatusStates.Running)) {
    return;
  }

  yield put(setFinAppStatusState({ id, statusState: AppStatusStates.Loading, origin: AppStatusOrigins.Default }));

  try {
    const uuid = yield call(createAndRunFromManifest, manifestUrl, id);

    yield put(openFinAppSuccess({ id, uuid, origin: AppStatusOrigins.Default }));
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.log('Error running app:', payload, '\n', e);

    yield put(openFinAppError({ id }));
  }
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

    yield put(closeFinAppSuccess({ uuid }));
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.log('Failed to close app with uuid:', uuid, '\n', e);

    yield put(closeFinAppError({ uuid }));
  }
}

function* watchSetAppDirectoryList() {
  yield put(reboundLauncherRequest(false, 0));
}

export function* appsSaga() {
  yield takeLatest(GET_APP_DIRECTORY_LIST, watchGetAppDirectoryList);
  yield takeEvery(OPEN_FIN_APP.REQUEST, watchOpenFinAppRequest);
  yield takeEvery(CLOSE_FIN_APP.REQUEST, watchCloseFinAppRequest);
  yield takeEvery(SET_APP_DIRECTORY_LIST, watchSetAppDirectoryList);
}
