import { call, put, takeEvery } from 'redux-saga/effects';

import { UnPromisfy } from '../../types/utils';
import { unbindFinAppEventHanlders } from '../../utils/finAppEventHandlerHelpers';
import { getSystemMonitorInfo } from '../../utils/openfinPromises';
import { reboundLauncher } from '../application';
import { closeFinApp } from '../apps';
import { getErrorFromCatch } from '../utils';
import { recoverLostWindows } from '../windows';
import { getAndSetMonitorInfo, setMonitorInfo, systemEventApplicationClosed, systemEventApplicationCrashed } from './actions';

function* watchGetAndSetMonitorInfo() {
  try {
    const systemMonitorInfo: UnPromisfy<ReturnType<typeof getSystemMonitorInfo>> = yield call(getSystemMonitorInfo);
    yield put(setMonitorInfo(systemMonitorInfo));
    yield put(getAndSetMonitorInfo.success(systemMonitorInfo));
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.log('Failed to get/set monitor information:', e);
    yield put(getAndSetMonitorInfo.failure(e));
  }
}

function* watchSetMonitorInfo() {
  try {
    yield put(reboundLauncher.request({ shouldAnimate: false, delay: 0 }));
    yield put(recoverLostWindows());
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.warn('Error in watchSetMonitorInfo', error);
  }
}

function* watchSystemEventApplicationClosed(action: ReturnType<typeof systemEventApplicationClosed>) {
  try {
    const { uuid } = action.payload;
    unbindFinAppEventHanlders(uuid);
    yield put(closeFinApp.success({ uuid }));
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.warn('Error in watchSystemEventApplicationClosed', error);
  }
}

function* watchSystemEventApplicationCrashed(action: ReturnType<typeof systemEventApplicationCrashed>) {
  try {
    const { uuid } = action.payload;
    unbindFinAppEventHanlders(uuid);
    yield put(closeFinApp.success({ uuid }));
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.warn('Error in watchSystemEventApplicationCrashed', error);
  }
}

// function* watchSystemEventApplicationStarted(action: SystemEventApplicationStartedAction) {
//   const eventPayload = action.payload;

//   if (!eventPayload) {
//     return;
//   }

//   const { uuid } = eventPayload;
// }

export function* systemSaga() {
  yield takeEvery(getAndSetMonitorInfo.request, watchGetAndSetMonitorInfo);
  yield takeEvery(setMonitorInfo, watchSetMonitorInfo);
  yield takeEvery(systemEventApplicationClosed, watchSystemEventApplicationClosed);
  yield takeEvery(systemEventApplicationCrashed, watchSystemEventApplicationCrashed);
  // yield takeEvery(SYSTEM_EVENT_APPLICATION_STARTED, watchSystemEventApplicationStarted);
}
