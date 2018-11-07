/* tslint:disable:no-console */
import { createAction } from 'redux-actions';
import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';

import ApiService from '../../services/ApiService';
import { ErrorResponse } from '../../types/commons';
import generateAsyncActionTypes from '../../utils/generateAsyncActionTypes';
import { setAppDirectoryList } from '../apps';
import { GET_APP_DIRECTORY_LIST } from './';
import { getLauncherAppIds } from './reducer';

// Action types
const ADD_TO_APP_LAUNCHER = 'ADD_TO_APP_LAUNCHER';
const REMOVE_FROM_APP_LAUNCHER = 'REMOVE_FROM_APP_LAUNCHER';
const GET_LAUNCHER_APP_IDS = generateAsyncActionTypes('GET_LAUNCHER_APP_IDS');
const SAVE_LAUNCHER_APP_IDS = generateAsyncActionTypes('SAVE_LAUNCHER_APP_IDS');

// Action creators
const getLauncherAppIdsError = createAction<ErrorResponse>(GET_LAUNCHER_APP_IDS.ERROR);
export const getLauncherAppIdsRequest = createAction(GET_LAUNCHER_APP_IDS.REQUEST);
const getLauncherAppIdsSuccess = createAction<string[]>(GET_LAUNCHER_APP_IDS.SUCCESS);
const saveLauncherAppIdsError = createAction<ErrorResponse>(SAVE_LAUNCHER_APP_IDS.ERROR);
const saveLauncherAppIdsRequest = createAction<string[]>(SAVE_LAUNCHER_APP_IDS.REQUEST);
const saveLauncherAppIdsSuccess = createAction(SAVE_LAUNCHER_APP_IDS.SUCCESS);

// SAGA
function* watchGetAppDirectoryList() {
  const appList = yield fetch('https://app-directory.openfin.co/api/v1/apps').then(res => res.json());

  yield put(setAppDirectoryList(appList));
}

function* watchGetLauncherAppsRequest() {
  const results = yield call(ApiService.getApps);
  yield put(getLauncherAppIdsSuccess(results));
}

function* dispatchSaveLauncherAppsRequest() {
  const apps = yield select(getLauncherAppIds);

  yield put(saveLauncherAppIdsRequest(apps));
}

function* watchSaveLauncherAppsRequest() {
  const appIds = yield select(getLauncherAppIds);
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
