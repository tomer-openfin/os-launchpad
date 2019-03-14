import { call, put, takeEvery } from 'redux-saga/effects';

import ApiService from '../../services/ApiService';

import { getAppDirectoryList } from '../apps';
import { getErrorFromCatch, getErrorMessageFromResponse, isErrorResponse } from '../utils';
import { createAdminApp, createAdminUser, deleteAdminApp, deleteAdminUser, getAdminApps, getAdminUsers, updateAdminApp, updateAdminUser } from './actions';

export function* watchGetAdminAppsRequest(action: ReturnType<typeof getAdminApps.request>) {
  try {
    const response = yield call(ApiService.getAdminApps);

    if (isErrorResponse(response) || !response.length) {
      throw new Error(getErrorMessageFromResponse(response));
    }

    const appList = response;
    yield put(getAdminApps.success(appList, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(getAdminApps.failure(error, action.meta));
  }
}

export function* watchCreateAdminAppRequest(action: ReturnType<typeof createAdminApp.request>) {
  try {
    const response = yield call(ApiService.createAdminApp, action.payload);

    if (isErrorResponse(response) || !response.app) {
      throw new Error(getErrorMessageFromResponse(response));
    }

    const { app } = response;
    yield put(createAdminApp.success(app, action.meta));
    yield put(getAppDirectoryList.request());
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(createAdminApp.failure(error, action.meta));
  }
}

export function* watchUpdateAdminAppRequest(action: ReturnType<typeof updateAdminApp.request>) {
  try {
    const response = yield call(ApiService.updateAdminApp, action.payload);

    if (isErrorResponse(response) || !response.app) {
      throw new Error(getErrorMessageFromResponse(response));
    }

    const { app } = response;
    yield put(updateAdminApp.success(app, action.meta));
    yield put(getAppDirectoryList.request());
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(updateAdminApp.failure(error, action.meta));
  }
}

export function* watchDeleteAdminAppRequest(action: ReturnType<typeof deleteAdminApp.request>) {
  try {
    const response = yield call(ApiService.deleteAdminApp, action.payload);

    if (isErrorResponse(response)) {
      throw new Error(getErrorMessageFromResponse(response));
    }

    yield put(deleteAdminApp.success(action.payload, action.meta));
    yield put(getAppDirectoryList.request());
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(deleteAdminApp.failure(error, action.meta));
  }
}

export function* watchGetAdminUsersRequest(action: ReturnType<typeof getAdminUsers.request>) {
  try {
    const response = yield call(ApiService.getAdminUsers);

    if (isErrorResponse(response) || !response.length) {
      throw new Error(getErrorMessageFromResponse(response));
    }

    yield put(getAdminUsers.success(response, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(getAdminUsers.failure(error, action.meta));
  }
}

export function* watchCreateAdminUserRequest(action: ReturnType<typeof createAdminUser.request>) {
  try {
    const response = yield call(ApiService.createAdminUser, action.payload);

    if (isErrorResponse(response) || !response.user) {
      throw new Error(getErrorMessageFromResponse(response));
    }

    yield put(createAdminUser.success(response.user, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(createAdminUser.failure(error, action.meta));
  }
}

export function* watchUpdateAdminUserRequest(action: ReturnType<typeof updateAdminUser.request>) {
  try {
    const response = yield call(ApiService.updateAdminUser, action.payload);

    if (isErrorResponse(response) || !response.user) {
      throw new Error(getErrorMessageFromResponse(response));
    }

    yield put(updateAdminUser.success(response.user, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(updateAdminUser.failure(error, action.meta));
  }
}

export function* watchDeleteAdminUserRequest(action: ReturnType<typeof deleteAdminUser.request>) {
  try {
    const response = yield call(ApiService.deleteAdminUser, action.payload);

    if (isErrorResponse(response)) {
      throw new Error(getErrorMessageFromResponse(response));
    }

    yield put(deleteAdminUser.success(action.payload, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(deleteAdminUser.failure(error, action.meta));
  }
}

export function* adminSaga() {
  yield takeEvery(createAdminApp.request, watchCreateAdminAppRequest);
  yield takeEvery(createAdminUser.request, watchCreateAdminUserRequest);
  yield takeEvery(deleteAdminApp.request, watchDeleteAdminAppRequest);
  yield takeEvery(deleteAdminUser.request, watchDeleteAdminUserRequest);
  yield takeEvery(getAdminApps.request, watchGetAdminAppsRequest);
  yield takeEvery(getAdminUsers.request, watchGetAdminUsersRequest);
  yield takeEvery(updateAdminApp.request, watchUpdateAdminAppRequest);
  yield takeEvery(updateAdminUser.request, watchUpdateAdminUserRequest);
}
