import { all, call, delay, put, select, takeLatest } from 'redux-saga/effects';

import { SNAPSHOT_OVERLAY_WINDOW, SNAPSHOT_WINDOW } from '../../config/windows';
import { UnPromisfy } from '../../types/utils';
import { isBoundsInCoordinates } from '../../utils/coordinateHelpers';
import { animateWindow, getWindowBounds, getWindowSnapshot, hideWindow, setWindowBounds, showWindow } from '../../utils/finUtils';
import getOwnUuid from '../../utils/getOwnUuid';
import { getMonitorDetails } from '../system';
import { getErrorFromCatch } from '../utils';
import { clearSnapshot, setOverlayIdentity, setSnapshot, setSnapshotImgSrc } from './actions';

function* watchSetAndClearSnapshot(action: ReturnType<typeof setSnapshot> | ReturnType<typeof clearSnapshot>) {
  try {
    const uuid = getOwnUuid();
    const windowIdentity = { uuid, name: SNAPSHOT_WINDOW };

    if (action.type === clearSnapshot.toString()) {
      yield call(hideWindow(windowIdentity));
      return;
    }

    const { anchorIdentity, snapshotIdentity } = action.payload;
    const [imgSrc, snapshotBounds, anchorBounds]: [
      UnPromisfy<ReturnType<ReturnType<typeof getWindowSnapshot>>>,
      UnPromisfy<ReturnType<ReturnType<typeof getWindowBounds>>>,
      UnPromisfy<ReturnType<ReturnType<typeof getWindowBounds>>>
    ] = yield all([call(getWindowSnapshot(snapshotIdentity)), call(getWindowBounds(snapshotIdentity)), call(getWindowBounds(anchorIdentity))]);
    yield put(setSnapshotImgSrc(`data:image/png;base64,${imgSrc}`));

    const isWider = snapshotBounds.width > snapshotBounds.height;
    const MAX_DIMENSION = 300;
    const factor = MAX_DIMENSION / (isWider ? snapshotBounds.width : snapshotBounds.height);
    const width = isWider ? MAX_DIMENSION : snapshotBounds.width * factor;
    const height = isWider ? snapshotBounds.height * factor : MAX_DIMENSION;
    const monitorDetails: ReturnType<typeof getMonitorDetails> = yield select(getMonitorDetails);
    const rightSideBounds = { top: anchorBounds.top, left: anchorBounds.left + anchorBounds.width, width, height };
    const foundMonitorDetails = monitorDetails.find(monitorDetail => isBoundsInCoordinates(rightSideBounds, monitorDetail.monitorRect));
    const snapshotWindowBounds = foundMonitorDetails ? rightSideBounds : { top: anchorBounds.top, left: anchorBounds.left - width, width, height };
    const delta = foundMonitorDetails ? width * -1 : width;

    yield call(setWindowBounds(windowIdentity), { ...snapshotWindowBounds, left: snapshotWindowBounds.left + delta });
    yield call(showWindow(windowIdentity));
    yield call(
      animateWindow(windowIdentity),
      {
        position: {
          duration: 300,
          left: snapshotWindowBounds.left,
          relative: false,
          top: snapshotWindowBounds.top,
        },
      },
      {
        interrupt: true,
        tween: 'ease-in-out',
      },
    );
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.warn('Error in watchSetAndClearSnapshot', error);
  }
}

function* watchSetOverlayIdentity(action: ReturnType<typeof setOverlayIdentity>) {
  try {
    const uuid = getOwnUuid();
    const overlayIdentity = { uuid, name: SNAPSHOT_OVERLAY_WINDOW };

    if (action.payload === null) {
      yield call(hideWindow(overlayIdentity));
      return;
    }

    // Delay showing of snapshot and overlay unless mouse stays on
    yield delay(1000);

    const bounds: UnPromisfy<ReturnType<ReturnType<typeof getWindowBounds>>> = yield call(getWindowBounds(action.payload));

    yield call(setWindowBounds(overlayIdentity), bounds);
    yield call(showWindow(overlayIdentity));
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.warn('Error in watchSetOverlayIdentity', error);
  }
}

export function* snapshotSaga() {
  yield takeLatest([clearSnapshot.toString(), setSnapshot.toString()], watchSetAndClearSnapshot);
  yield takeLatest(setOverlayIdentity, watchSetOverlayIdentity);
}
