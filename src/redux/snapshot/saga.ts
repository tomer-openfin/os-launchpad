import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { SNAPSHOT_OVERLAY_WINDOW, SNAPSHOT_WINDOW } from '../../config/windows';
import { UnPromisfy } from '../../types/utils';
import { isBoundsInCoordinates } from '../../utils/coordinateHelpers';
import { getWindowBounds, getWindowSnapshot, hideWindow, setWindowBounds, showWindow } from '../../utils/finUtils';
import getOwnUuid from '../../utils/getOwnUuid';
import { getMonitorDetails } from '../system';
import { getErrorFromCatch } from '../utils';
import { getWindowBounds as selectWindowBounds } from '../windows';
import { clearSnapshot, getAndSetSnapshot } from './actions';
import { getSnapshotAnchor, getSnapshotAnchorIdentity } from './selectors';

function* watchGetAndSetSnapshotRequest(action: ReturnType<typeof getAndSetSnapshot.request> | ReturnType<typeof clearSnapshot>) {
  try {
    if (action.type === clearSnapshot.toString()) {
      return;
    }

    const [imgSrc, sourceBounds]: [
      UnPromisfy<ReturnType<ReturnType<typeof getWindowSnapshot>>>,
      UnPromisfy<ReturnType<ReturnType<typeof getWindowBounds>>>
    ] = yield all([call(getWindowSnapshot(action.payload)), call(getWindowBounds(action.payload))]);

    yield put(getAndSetSnapshot.success({ imgSrc: `data:image/png;base64,${imgSrc}`, sourceBounds, sourceIdentity: action.payload }));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(getAndSetSnapshot.failure(error));
  }
}

function* watchClearSnapshot() {
  try {
    const uuid = getOwnUuid();

    yield all([call(hideWindow({ uuid, name: SNAPSHOT_OVERLAY_WINDOW })), call(hideWindow({ uuid, name: SNAPSHOT_WINDOW }))]);
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.warn('Error in watchClearSnapshot', error);
  }
}

function* watchGetAndSetSnapshotSuccess(action: ReturnType<typeof getAndSetSnapshot.success>) {
  try {
    const { sourceBounds } = action.payload;

    const uuid = getOwnUuid();
    const overlayIdentity = { uuid, name: SNAPSHOT_OVERLAY_WINDOW };
    const snapshotIdentity = { uuid, name: SNAPSHOT_WINDOW };

    const isWider = sourceBounds.width > sourceBounds.height;
    const MAX_DIMENSION = 300;
    const factor = MAX_DIMENSION / (isWider ? sourceBounds.width : sourceBounds.height);
    const width = isWider ? MAX_DIMENSION : sourceBounds.width * factor;
    const height = isWider ? sourceBounds.height * factor : MAX_DIMENSION;
    const anchor: ReturnType<typeof getSnapshotAnchor> = yield select(getSnapshotAnchor);
    const anchorIdentity: ReturnType<typeof getSnapshotAnchorIdentity> = yield select(getSnapshotAnchorIdentity);
    let anchorBounds: ReturnType<typeof selectWindowBounds> = yield select(selectWindowBounds, (anchorIdentity && anchorIdentity.name) || '');
    if (!anchorBounds) {
      anchorBounds = { top: 0, left: 0, width: 0, height: 0 };
    }
    const monitorDetails: ReturnType<typeof getMonitorDetails> = yield select(getMonitorDetails);
    const rightSideBounds = { top: anchor.top - height / 2, left: anchorBounds.left + anchorBounds.width, width, height };
    const foundMonitorDetails = monitorDetails.find(monitorDetail => isBoundsInCoordinates(rightSideBounds, monitorDetail.monitorRect));
    const snapshotWindowBounds = foundMonitorDetails ? rightSideBounds : { top: anchor.top - height / 2, left: anchorBounds.left - width, width, height };
    yield all([call(setWindowBounds(overlayIdentity), sourceBounds), call(setWindowBounds(snapshotIdentity), snapshotWindowBounds)]);
    yield all([call(showWindow(overlayIdentity)), call(showWindow(snapshotIdentity))]);
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.warn('Error in watchGetAndSetSnapshotSuccess', error);
  }
}

export function* snapshotSaga() {
  yield takeLatest([getAndSetSnapshot.request.toString(), clearSnapshot.toString()], watchGetAndSetSnapshotRequest);
  yield takeLatest(clearSnapshot, watchClearSnapshot);
  yield takeLatest(getAndSetSnapshot.success, watchGetAndSetSnapshotSuccess);
}
