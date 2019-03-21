import { call, put, takeEvery } from 'redux-saga/effects';

import ApiService from '../../services/ApiService/index';
import { ApiResponseStatus } from '../../types/enums';
import { UnPromisfy } from '../../types/utils';
import { getErrorFromCatch } from '../utils';
import { sendSupport } from './actions';

export function* watchSendSupportRequest(action: ReturnType<typeof sendSupport.request>) {
  try {
    const response: UnPromisfy<ReturnType<typeof ApiService.sendSupport>> = yield call(ApiService.sendSupport, action.payload);

    if (response.status === ApiResponseStatus.Failure) {
      throw new Error(response.message);
    }

    yield put(sendSupport.success(response.data, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(sendSupport.failure(error, action.meta));
  }
}

export function* supportSaga() {
  yield takeEvery(sendSupport.request, watchSendSupportRequest);
}
