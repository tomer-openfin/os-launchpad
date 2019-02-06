import { Window } from '@giantmachines/redux-openfin';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import { CONTEXT_MENU } from '../../config/windows';
import { isBoundsInCoordinates, isPosInCoordinates } from '../../utils/coordinateHelpers';
import { getFinWindowByName } from '../../utils/getLauncherFinWindow';
import { setWindowBoundsPromise } from '../../utils/openfinPromises';
import { getMonitorInfo } from '../system';
import { hideWindow } from '../windows';
import { CLOSE_CONTEXT_MENU, closeContextMenuSuccess, OPEN_CONTEXT_MENU, openContextMenuSuccess } from './actions';
import { OpenContextMenuRequest } from './types';

const PADDING = 10;
// TODO: Do width and height calculations after dom has been rendered
//       not based on these consts that can very easily change
//       due to imposibility of measuring character widths
const OPTION_HEIGHT = 14;
const W_CHAR_WIDTH = 6;

function* watchCloseContextMenuRequest() {
  yield put(hideWindow(CONTEXT_MENU));

  yield put(closeContextMenuSuccess());
}

function* watchOpenContextMenuRequest(action: OpenContextMenuRequest) {
  yield put(hideWindow(CONTEXT_MENU));

  const { payload } = action;
  if (!payload) {
    return;
  }

  const finWindow = yield call(getFinWindowByName, CONTEXT_MENU);
  const monitorInfo: ReturnType<typeof getMonitorInfo> = yield select(getMonitorInfo);
  const { anchor, options } = payload;
  if (!options.length || !monitorInfo || !finWindow) {
    return;
  }

  // Calculate dimensions
  const longestLabel = options.reduce((acc, option) => Math.max(option.label.length, acc), 0);
  const width = W_CHAR_WIDTH * longestLabel + PADDING * 2;
  const height = (OPTION_HEIGHT + PADDING * 2) * options.length;

  // Calculate directional coordinates
  const isAnchorInPrimaryMonitor = isPosInCoordinates(anchor, monitorInfo.primaryMonitor.availableRect);
  const monitorInfoDetails = isAnchorInPrimaryMonitor
    ? monitorInfo.primaryMonitor
    : monitorInfo.nonPrimaryMonitors.find(monitor => isPosInCoordinates(anchor, monitor.availableRect));
  if (!monitorInfoDetails) {
    return;
  }

  const { left, top } = anchor;
  let bounds;
  // TODO: Create function which tells you how it is out of bounds and where to place it
  //       instead of trying all 4 cases
  const bottomRightBounds = {
    ...anchor,
    height,
    width,
  };
  const bottomLeftBounds = {
    height,
    left: left - width,
    top,
    width,
  };
  const topRightBounds = {
    height,
    left,
    top: top - height,
    width,
  };
  const topLeftBounds = {
    height,
    left: left - width,
    top: top - height,
    width,
  };

  // Default to bottom right
  if (isBoundsInCoordinates(bottomRightBounds, monitorInfoDetails.availableRect)) {
    bounds = bottomRightBounds;
  } else if (isBoundsInCoordinates(bottomLeftBounds, monitorInfoDetails.availableRect)) {
    bounds = bottomLeftBounds;
  } else if (isBoundsInCoordinates(topRightBounds, monitorInfoDetails.availableRect)) {
    bounds = topRightBounds;
  } else if (isBoundsInCoordinates(topLeftBounds, monitorInfoDetails.availableRect)) {
    bounds = topLeftBounds;
  }

  if (!bounds) {
    return;
  }

  yield call(setWindowBoundsPromise, finWindow, bounds);

  yield put(
    openContextMenuSuccess({
      anchor,
      bounds,
      options,
    }),
  );
}

function* watchOpenContextMenuSuccess() {
  yield put(Window.showWindow({ id: CONTEXT_MENU }));
  yield put(Window.focusWindow({ id: CONTEXT_MENU }));
}

export function* contextMenuSaga() {
  yield takeLatest(CLOSE_CONTEXT_MENU.REQUEST, watchCloseContextMenuRequest);
  yield takeLatest(OPEN_CONTEXT_MENU.REQUEST, watchOpenContextMenuRequest);
  yield takeLatest(OPEN_CONTEXT_MENU.SUCCESS, watchOpenContextMenuSuccess);
}
