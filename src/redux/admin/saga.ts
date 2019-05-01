import { call, put, select, takeEvery } from 'redux-saga/effects';

import ApiService from '../../services/ApiService';

import windowsConfig, { PREVIEW_WINDOW } from '../../config/windows';
import { ApiResponseStatus } from '../../types/enums';
import { UnPromisfy } from '../../types/utils';
import { getAppDirectoryList } from '../apps';
import { getErrorFromCatch } from '../utils';
import { getWindowIsShowing, toggleWindow } from '../windows';
import {
  clickComponentPreview,
  createAdminApp,
  createAdminUser,
  deleteAdminApp,
  deleteAdminUser,
  getAdminApps,
  getAdminUsers,
  setPreviewType,
  updateAdminApp,
  updateAdminUser,
} from './actions';
import { getAdminPreviewTypeState } from './selectors';

export function* watchGetAdminAppsRequest(action: ReturnType<typeof getAdminApps.request>) {
  try {
    const response: UnPromisfy<ReturnType<typeof ApiService.getAdminApps>> = yield call(ApiService.getAdminApps);

    if (response.status === ApiResponseStatus.Failure) {
      throw new Error(response.message);
    }

    yield put(getAdminApps.success(response.data, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(getAdminApps.failure(error, action.meta));
  }
}

export function* watchCreateAdminAppRequest(action: ReturnType<typeof createAdminApp.request>) {
  try {
    const response: UnPromisfy<ReturnType<typeof ApiService.createAdminApp>> = yield call(ApiService.createAdminApp, action.payload);

    if (response.status === ApiResponseStatus.Failure) {
      throw new Error(response.message);
    }

    yield put(createAdminApp.success(response.data, action.meta));
    yield put(getAppDirectoryList.request());
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(createAdminApp.failure(error, action.meta));
  }
}

export function* watchUpdateAdminAppRequest(action: ReturnType<typeof updateAdminApp.request>) {
  try {
    const response: UnPromisfy<ReturnType<typeof ApiService.updateAdminApp>> = yield call(ApiService.updateAdminApp, action.payload);

    if (response.status === ApiResponseStatus.Failure) {
      throw new Error(response.message);
    }

    yield put(updateAdminApp.success(response.data, action.meta));
    yield put(getAppDirectoryList.request());
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(updateAdminApp.failure(error, action.meta));
  }
}

export function* watchDeleteAdminAppRequest(action: ReturnType<typeof deleteAdminApp.request>) {
  try {
    const response: UnPromisfy<ReturnType<typeof ApiService.deleteAdminApp>> = yield call(ApiService.deleteAdminApp, action.payload);

    if (response.status === ApiResponseStatus.Failure) {
      throw new Error(response.message);
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
    const response: UnPromisfy<ReturnType<typeof ApiService.getAdminUsers>> = yield call(ApiService.getAdminUsers);

    if (response.status === ApiResponseStatus.Failure) {
      throw new Error(response.message);
    }

    yield put(getAdminUsers.success(response.data, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(getAdminUsers.failure(error, action.meta));
  }
}

export function* watchCreateAdminUserRequest(action: ReturnType<typeof createAdminUser.request>) {
  try {
    const response: UnPromisfy<ReturnType<typeof ApiService.createAdminUser>> = yield call(ApiService.createAdminUser, action.payload);

    if (response.status === ApiResponseStatus.Failure) {
      throw new Error(response.message);
    }

    yield put(createAdminUser.success(response.data, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(createAdminUser.failure(error, action.meta));
  }
}

export function* watchUpdateAdminUserRequest(action: ReturnType<typeof updateAdminUser.request>) {
  try {
    const response: UnPromisfy<ReturnType<typeof ApiService.updateAdminUser>> = yield call(ApiService.updateAdminUser, action.payload);

    if (response.status === ApiResponseStatus.Failure) {
      throw new Error(response.message);
    }

    yield put(updateAdminUser.success(response.data, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(updateAdminUser.failure(error, action.meta));
  }
}

export function* watchDeleteAdminUserRequest(action: ReturnType<typeof deleteAdminUser.request>) {
  try {
    const response: UnPromisfy<ReturnType<typeof ApiService.deleteAdminUser>> = yield call(ApiService.deleteAdminUser, action.payload);

    if (response.status === ApiResponseStatus.Failure) {
      throw new Error(response.message);
    }

    yield put(deleteAdminUser.success(action.payload, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(deleteAdminUser.failure(error, action.meta));
  }
}

export function* watchClickComponentPreview(action: ReturnType<typeof clickComponentPreview>) {
  try {
    const newPreviewType = action.payload;

    const oldPreviewType = yield select(getAdminPreviewTypeState);

    yield put(setPreviewType(newPreviewType));

    const isShowing = yield select(getWindowIsShowing, PREVIEW_WINDOW);

    if (isShowing && newPreviewType !== oldPreviewType) {
      return;
    }

    yield put(toggleWindow(windowsConfig.preview));
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.warn('Error in clickComponentPreview', error);
  }
}

// watch an action, it does nothing.
// the saga catches it, changes the type, waits for it, then shows the window
// also handles hiding the window.

export function* adminSaga() {
  yield takeEvery(createAdminApp.request, watchCreateAdminAppRequest);
  yield takeEvery(createAdminUser.request, watchCreateAdminUserRequest);
  yield takeEvery(deleteAdminApp.request, watchDeleteAdminAppRequest);
  yield takeEvery(deleteAdminUser.request, watchDeleteAdminUserRequest);
  yield takeEvery(getAdminApps.request, watchGetAdminAppsRequest);
  yield takeEvery(getAdminUsers.request, watchGetAdminUsersRequest);
  yield takeEvery(updateAdminApp.request, watchUpdateAdminAppRequest);
  yield takeEvery(updateAdminUser.request, watchUpdateAdminUserRequest);
  yield takeEvery(clickComponentPreview, watchClickComponentPreview);
}
