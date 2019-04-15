import { call, put, select, takeLatest } from 'redux-saga/effects';

import ApiService from '../../services/ApiService';

import { ApiResponseStatus } from '../../types/enums';
import { UnPromisfy } from '../../types/utils';
import { getErrorFromCatch } from '../utils';
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
    console.warn('Error in watchSaveOrgImage', error);
  }
}

function* watchSaveOrgActiveThemeId(action: ReturnType<typeof saveOrgActiveThemeId>) {
  try {
    const orgSettings: ReturnType<typeof getOrganizationSettings> = yield select(getOrganizationSettings);

    yield put(saveAdminOrgSettings.request({ ...orgSettings, activeThemeId: action.payload }, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.warn('Error in watchSaveOrgImage', error);
  }
}

function* watchGetOrgSettingsRequest(action: ReturnType<typeof getOrgSettings.request>) {
  try {
    const response: UnPromisfy<ReturnType<typeof ApiService.getOrgSettings>> = yield call(ApiService.getOrgSettings);

    if (response.status === ApiResponseStatus.Failure) {
      throw new Error(response.message);
    }

    yield put(getOrgSettings.success(response.data, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(getOrgSettings.failure(error, action.meta));
  }
}

function* watchGetAdminOrgSettingsRequest(action: ReturnType<typeof getAdminOrgSettings.request>) {
  try {
    const response: UnPromisfy<ReturnType<typeof ApiService.getAdminOrgSettings>> = yield call(ApiService.getAdminOrgSettings);

    if (response.status === ApiResponseStatus.Failure) {
      throw new Error(response.message);
    }

    yield put(getAdminOrgSettings.success(response.data, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(getAdminOrgSettings.failure(error, action.meta));
  }
}

function* watchSaveAdminOrgSettingsRequest(action: ReturnType<typeof saveAdminOrgSettings.request>) {
  try {
    const response: UnPromisfy<ReturnType<typeof ApiService.saveAdminOrgSettings>> = yield call(ApiService.saveAdminOrgSettings, action.payload);

    if (response.status === ApiResponseStatus.Failure) {
      throw new Error(response.message);
    }

    yield put(saveAdminOrgSettings.success(action.payload, action.meta));
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
