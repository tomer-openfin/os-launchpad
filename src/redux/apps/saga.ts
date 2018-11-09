import { all, call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';

import ApiService from '../../services/ApiService';

import {
  ADD_TO_APP_LAUNCHER,
  GET_APP_DIRECTORY_LIST,
  GET_LAUNCHER_APP_IDS,
  getLauncherAppIdsSuccess,
  REMOVE_FROM_APP_LAUNCHER,
  SAVE_LAUNCHER_APP_IDS,
  saveLauncherAppIdsRequest,
  saveLauncherAppIdsSuccess,
  setAppDirectoryList,
  setAppLauncherIds,
} from './actions';
import { getAppsLauncherIds } from './selectors';

function* watchGetAppDirectoryList() {
  const appList = yield fetch('https://app-directory.openfin.co/api/v1/apps').then(res => res.json());

  yield put(setAppDirectoryList(appList));
}

function* watchGetLauncherAppsRequest() {
  const results = yield call(ApiService.getApps);

  yield all([put(getLauncherAppIdsSuccess()), put(setAppLauncherIds(results))]);
}

function* dispatchSaveLauncherAppsRequest() {
  const apps = yield select(getAppsLauncherIds);

  yield put(saveLauncherAppIdsRequest(apps));
}

function* watchSaveLauncherAppsRequest() {
  const appIds = yield select(getAppsLauncherIds);

  yield call(ApiService.saveApps, appIds);

  yield put(saveLauncherAppIdsSuccess());
}

export function* appsSaga() {
  yield takeLatest(GET_APP_DIRECTORY_LIST, watchGetAppDirectoryList);
  yield takeEvery(ADD_TO_APP_LAUNCHER, dispatchSaveLauncherAppsRequest);
  yield takeEvery(REMOVE_FROM_APP_LAUNCHER, dispatchSaveLauncherAppsRequest);
  yield takeLatest(GET_LAUNCHER_APP_IDS.REQUEST, watchGetLauncherAppsRequest);
  yield takeLatest(SAVE_LAUNCHER_APP_IDS.REQUEST, watchSaveLauncherAppsRequest);
}
