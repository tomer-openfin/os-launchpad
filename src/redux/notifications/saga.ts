import { call, put, takeEvery } from 'redux-saga/effects';

import { UnPromisfy } from '../../types/utils';
import { getErrorFromCatch } from '../utils';
import { toggleNotificationCenter } from './actions';
import { toggleFinNotificationCenter } from './utils';

export function* watchToggleNotificationCenterRequest(action: ReturnType<typeof toggleNotificationCenter.request>) {
  try {
    const result: UnPromisfy<ReturnType<typeof toggleFinNotificationCenter>> = yield call(toggleFinNotificationCenter);

    yield put(toggleNotificationCenter.success(result, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(toggleNotificationCenter.failure(error, action.meta));
  }
}

export function* notificationsSaga() {
  yield takeEvery(toggleNotificationCenter.request, watchToggleNotificationCenterRequest);
}
