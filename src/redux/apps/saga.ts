import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';

import ApiService from '../../services/ApiService';

import { closeApplication, createAndRunFromManifest, wrapApplication } from '../../utils/openfinPromises';
import { addIdFromKey } from '../admin/saga';
import {
  CLOSE_FIN_APP,
  closeFinAppError,
  closeFinAppSuccess,
  finAppLoading,
  GET_APP_DIRECTORY_LIST,
  OPEN_FIN_APP,
  openFinAppError,
  openFinAppSuccess,
  setAppDirectoryList,
} from './actions';
import { getAppStatusByName } from './selectors';
import { AppStatusStates, CloseFinAppRequest, OpenFinAppRequest } from './types';

function* watchGetAppDirectoryList() {
  const response = yield call(ApiService.getDirectoryAppList);

  const appList = response.map(addIdFromKey('name'));

  yield put(setAppDirectoryList(appList));
}

function* watchOpenFinAppRequest(action: OpenFinAppRequest) {
  const { payload } = action;
  if (!payload) {
    return;
  }

  const { name, manifest_url: manifestUrl } = payload;
  const status = yield select(getAppStatusByName, name);
  if (status && (status.state === AppStatusStates.Loading || status.state === AppStatusStates.Running)) {
    return;
  }

  yield put(finAppLoading({ name }));

  try {
    const uuid = yield call(createAndRunFromManifest, manifestUrl, name);
    yield put(openFinAppSuccess({ name, uuid }));
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.log('Error running app:', payload, '\n', e);
    yield put(openFinAppError({ name }));
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

export function* appsSaga() {
  yield takeLatest(GET_APP_DIRECTORY_LIST, watchGetAppDirectoryList);
  yield takeEvery(OPEN_FIN_APP.REQUEST, watchOpenFinAppRequest);
  yield takeEvery(CLOSE_FIN_APP.REQUEST, watchCloseFinAppRequest);
}
