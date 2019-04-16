import { Window } from '@giantmachines/redux-openfin';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import { CONTEXT_MENU } from '../../config/windows';
import { isBoundsInCoordinates, isPosInCoordinates } from '../../utils/coordinateHelpers';
import { getFinWindowByName } from '../../utils/getLauncherFinWindow';
import { setWindowBoundsPromise } from '../../utils/openfinPromises';
import { getMonitorInfo } from '../system';
import { getErrorFromCatch } from '../utils';
import { hideWindow } from '../windows';
import { closeContextMenu, openContextMenu } from './actions';

const PADDING = 10;
// TODO: Do width and height calculations after dom has been rendered
//       not based on these consts that can very easily change
//       due to imposibility of measuring character widths
const OPTION_HEIGHT = 14;
const W_CHAR_WIDTH = 6;

function* watchCloseContextMenuRequest(action: ReturnType<typeof closeContextMenu.request>) {
  try {
    yield put(hideWindow({ name: CONTEXT_MENU }));
    yield put(closeContextMenu.success(undefined, action.meta));
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(closeContextMenu.failure(error, action.meta));
  }
}

function* watchOpenContextMenuRequest(action: ReturnType<typeof openContextMenu.request>) {
  try {
    yield put(hideWindow({ name: CONTEXT_MENU }));

    const finWindow = yield call(getFinWindowByName, CONTEXT_MENU);
    const monitorInfo: ReturnType<typeof getMonitorInfo> = yield select(getMonitorInfo);
    const { anchor, options } = action.payload;
    if (!options.length || !monitorInfo || !finWindow) {
      throw new Error('finWindow, monitor info or options is missing');
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
      throw new Error('Unable to calculate monitorInfoDetails');
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
      throw new Error('Unable to calculate bounds');
    }

    yield call(setWindowBoundsPromise, finWindow, bounds);

    yield put(
      openContextMenu.success(
        {
          anchor,
          bounds,
          options,
        },
        action.meta,
      ),
    );
  } catch (e) {
    const error = getErrorFromCatch(e);
    yield put(openContextMenu.failure(error, action.meta));
  }
}

function* watchOpenContextMenuSuccess() {
  try {
    yield put(Window.showWindow({ id: CONTEXT_MENU }));
    yield put(Window.focusWindow({ id: CONTEXT_MENU }));
  } catch (e) {
    const error = getErrorFromCatch(e);
    // tslint:disable-next-line:no-console
    console.warn('Error in watchOpenContextMenuSuccess', error);
  }
}

export function* contextMenuSaga() {
  yield takeLatest(closeContextMenu.request, watchCloseContextMenuRequest);
  yield takeLatest(openContextMenu.request, watchOpenContextMenuRequest);
  yield takeLatest(openContextMenu.success, watchOpenContextMenuSuccess);
}
