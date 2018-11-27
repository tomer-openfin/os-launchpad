import { call, put, takeLatest } from 'redux-saga/effects';

import ApiService from '../../services/ApiService';

import { GET_APP_DIRECTORY_LIST, setAppDirectoryList } from './actions';

function* watchGetAppDirectoryList() {
  const appList = yield call(ApiService.getDirectoryAppList);

  yield put(setAppDirectoryList(appList));
}

export function* appsSaga() {
  yield takeLatest(GET_APP_DIRECTORY_LIST, watchGetAppDirectoryList);
}
