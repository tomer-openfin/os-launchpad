import { call, put, select, takeLatest } from 'redux-saga/effects';

import ApiService from '../../services/ApiService';

import { getErrorFromCatch, getErrorMessageFromResponse, isErrorResponse } from '../utils';
import { getAdminOrgSettings, getOrgSettings, saveAdminOrgSettings, saveOrgActiveThemeId, saveOrgImage } from './actions';
import { getOrganizationSettings } from './selectors';

function* watchSaveOrgImage(action: ReturnType<typeof saveOrgImage>) {
  try {
    const orgSettings: ReturnType<typeof getOrganizationSettings> = yield select(getOrganizationSettings);
    const newOrgSettings = { ...orgSettings, ...action.payload };

    yield put(saveAdminOrgSettings.request(newOrgSettings, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.log('Error in watchSaveOrgImage', error);
  }
}

function* watchSaveOrgActiveThemeId(action: ReturnType<typeof saveOrgActiveThemeId>) {
  try {
    const orgSettings: ReturnType<typeof getOrganizationSettings> = yield select(getOrganizationSettings);

    const activeThemeId = action.payload;
    if (!activeThemeId) return;

    yield put(saveAdminOrgSettings.request({ ...orgSettings, activeThemeId }, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.log('Error in watchSaveOrgImage', error);
  }
}

function* watchGetOrgSettingsRequest(action: ReturnType<typeof getOrgSettings.request>) {
  try {
    const response = yield call(ApiService.getOrgSettings);
    if (isErrorResponse(response)) {
      throw new Error(getErrorMessageFromResponse(response));
    }

    yield put(getOrgSettings.success(response, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(getOrgSettings.failure(error, action.meta));
  }
}

function* watchGetAdminOrgSettingsRequest(action: ReturnType<typeof getAdminOrgSettings.request>) {
  try {
    const response = yield call(ApiService.getAdminOrgSettings);
    if (isErrorResponse(response)) {
      throw new Error(getErrorMessageFromResponse(response));
    }

    yield put(getAdminOrgSettings.success(response, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(getAdminOrgSettings.failure(error, action.meta));
  }
}

function* watchSaveAdminOrgSettingsRequest(action: ReturnType<typeof saveAdminOrgSettings.request>) {
  try {
    const response = yield call(ApiService.saveAdminOrgSettings, action.payload);
    if (isErrorResponse(response)) {
      throw new Error(getErrorMessageFromResponse(response));
    }

    yield put(saveAdminOrgSettings.success(response, action.meta));
    yield put(getAdminOrgSettings.request());
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(saveAdminOrgSettings.failure(error, action.meta));
  }
}

export function* organizationSaga() {
  yield takeLatest(saveOrgImage, watchSaveOrgImage);
  yield takeLatest(saveOrgActiveThemeId, watchSaveOrgActiveThemeId);
  yield takeLatest(getOrgSettings.request, watchGetOrgSettingsRequest);
  yield takeLatest(getAdminOrgSettings.request, watchGetAdminOrgSettingsRequest);
  yield takeLatest(saveAdminOrgSettings.request, watchSaveAdminOrgSettingsRequest);
}
