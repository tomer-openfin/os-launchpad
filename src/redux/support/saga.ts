import { call, put, takeEvery } from 'redux-saga/effects';

import ApiService from '../../services/ApiService/index';
import { UnPromisfy } from '../../types/utils';
import { getErrorFromCatch } from '../utils';
import { sendSupport } from './actions';

export function* watchSendSupportRequest(action: ReturnType<typeof sendSupport.request>) {
  try {
    const result: UnPromisfy<ReturnType<typeof ApiService.sendSupport>> = yield call(ApiService.sendSupport, action.payload);

    yield put(sendSupport.success(result, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(sendSupport.failure(error, action.meta));
  }
}

export function* supportSaga() {
  yield takeEvery(sendSupport.request, watchSendSupportRequest);
}
