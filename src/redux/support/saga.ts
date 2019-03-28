import { call, put, takeEvery } from 'redux-saga/effects';

import ApiService from '../../services/ApiService';
import { ApiResponseStatus } from '../../types/enums';
import { UnPromisfy } from '../../types/utils';
import { getErrorFromCatch } from '../utils';
import { sendBug, sendFeedback } from './actions';

export function* watchSendFeedbackRequest(action: ReturnType<typeof sendFeedback.request>) {
  try {
    const response: UnPromisfy<ReturnType<typeof ApiService.sendFeedback>> = yield call(ApiService.sendFeedback, action.payload);

    if (response.status === ApiResponseStatus.Failure) {
      throw new Error(response.message);
    }

    yield put(sendFeedback.success(response.data, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(sendFeedback.failure(error, action.meta));
  }
}

export function* watchSendBugRequest(action: ReturnType<typeof sendBug.request>) {
  try {
    const response: UnPromisfy<ReturnType<typeof ApiService.sendBug>> = yield call(ApiService.sendBug, action.payload);

    if (response.status === ApiResponseStatus.Failure) {
      throw new Error(response.message);
    }

    yield put(sendBug.success(response.data, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(sendBug.failure(error, action.meta));
  }
}

export function* supportSaga() {
  yield takeEvery(sendFeedback.request, watchSendFeedbackRequest);
  yield takeEvery(sendBug.request, watchSendBugRequest);
}
