import { all, call, put, select, takeEvery } from 'redux-saga/effects';

import { LAYOUTS_WINDOW } from '../../config/windows';
import ApiService from '../../services/ApiService';
import { AppStatusOrigins, AppStatusStates, ErrorResponse, ResponseStatus, Transition, UserLayout } from '../../types/commons';
import getAppUuid from '../../utils/getAppUuid';
import { getFinWindowByName } from '../../utils/getLauncherFinWindow';
import { generateLayout, restoreLayout } from '../../utils/openfinLayouts';
import { animateWindow } from '../../utils/openfinPromises';
import { calcBoundsRelativeToLauncher } from '../../utils/windowPositionHelpers';
import { getApps, getAppsStatusById, openFinAppSuccess, setFinAppStatusState } from '../apps';
import { getLauncherPosition, getLauncherSizeConfig } from '../me';
import { getWindowBounds } from '../windows';
import {
  CREATE_LAYOUT,
  createLayoutError,
  createLayoutSuccess,
  DELETE_LAYOUT,
  deleteLayoutError,
  deleteLayoutSuccess,
  GET_LAYOUTS,
  getLayoutsError,
  getLayoutsSuccess,
  RESTORE_LAYOUT,
  restoreLayoutError,
  restoreLayoutSuccess,
  UPDATE_LAYOUT,
  updateLayoutError,
  updateLayoutSuccess,
} from './actions';
import { getLayoutById, getLayouts } from './selectors';
import { CreateLayoutRequest, DeleteLayoutRequest, RestoreLayoutRequest, RestoreLayoutSuccess, UpdateLayoutRequest } from './types';
import { calcDesiredLayoutsWindowHeight } from './utils';

const buildErrorResponse = (message: string): ErrorResponse => ({ status: ResponseStatus.FAILURE, message });

function* watchGetLayoutsRequest() {
  const response = yield call(ApiService.getUserLayouts);

  if (!response || response.status === ResponseStatus.FAILURE) {
    yield put(getLayoutsError(response));
  } else {
    yield put(getLayoutsSuccess(response));
  }
}

function* watchRestoreLayoutRequest(action: RestoreLayoutRequest) {
  const layoutId: string | undefined = action.payload;

  if (!layoutId) return yield put(restoreLayoutError(buildErrorResponse('Error getting layout for restore')));

  const userLayout: UserLayout = yield select(getLayoutById, layoutId);

  if (!userLayout) return yield put(restoreLayoutError(buildErrorResponse('Error getting layout for restore')));

  const { layout } = userLayout;

  if (!layout) return yield put(restoreLayoutError(buildErrorResponse('Error getting layout for restore')));

  try {
    const apps = yield select(getApps);
    const appsStatusById = yield select(getAppsStatusById);

    yield all(
      layout.apps.map(layoutApp => {
        const { manifestUrl, uuid } = layoutApp;
        const matchingApp = apps.find(app => app.manifest_url === manifestUrl);

        if (!matchingApp) {
          // tslint:disable-next-line:no-console
          console.error('Could not find manifestUrl in list of applications.', manifestUrl, uuid);
          return;
        }

        const { id } = matchingApp;
        const appStatus = appsStatusById[id];

        if (!appStatus || (appStatus && appStatus.state === AppStatusStates.Closed)) {
          return put(setFinAppStatusState({ id, statusState: AppStatusStates.Loading, origin: AppStatusOrigins.LayoutRestore }));
        }
        return;
      }),
    );
    const restoredLayout = yield call(restoreLayout, layout);

    yield put(restoreLayoutSuccess(restoredLayout));
  } catch (e) {
    yield put(restoreLayoutError(buildErrorResponse(e)));
  }
}

function* watchRestoreLayoutSuccess(action: RestoreLayoutSuccess) {
  const { fin } = window;
  const { payload: layout } = action;
  if (!layout || !fin) {
    return;
  }

  const apps = yield select(getApps);
  const appsStatusById = yield select(getAppsStatusById);
  yield all(
    layout.apps.map(layoutApp => {
      const { manifestUrl, uuid } = layoutApp;
      const matchingApp = apps.find(app => app.manifest_url === manifestUrl);

      if (!matchingApp) {
        // tslint:disable-next-line:no-console
        console.error('Could not find manifestUrl in list of applications.', manifestUrl, uuid);
        return;
      }

      const { id } = matchingApp;
      const appStatus = appsStatusById[id];

      if (appStatus && appStatus.state === AppStatusStates.Loading && appStatus.origin === AppStatusOrigins.LayoutRestore) {
        return put(
          openFinAppSuccess({
            id,
            origin: AppStatusOrigins.LayoutRestore,
            // TODO: clean up any, maybe upgrade types
            runtimeVersion: (layoutApp as any).runtime ? (layoutApp as any).runtime.version : '',
            uuid,
          }),
        );
      }

      return;
    }),
  );
}

export function* watchCreateLayoutRequest(action: CreateLayoutRequest) {
  const name = action.payload || 'layout';

  const layout = yield call(generateLayout);

  const userLayout = { name, layout };

  const response = yield call(ApiService.createUserLayout, userLayout);

  if (response.status === ResponseStatus.FAILURE || response === 'Internal Server Error' || !response.layout) {
    yield put(createLayoutError(response, action.meta));
  } else {
    yield put(createLayoutSuccess(response.layout, action.meta));
  }
}

function* watchUpdateLayoutRequest(action: UpdateLayoutRequest) {
  if (!action.payload) return;

  const { id, name, updateLayout } = action.payload;

  const userLayout = { id, name };

  if (updateLayout) {
    const layout = yield call(generateLayout);

    userLayout['layout'] = layout;
  }

  const response = yield call(ApiService.updateUserLayout, userLayout);

  if (response.status === ResponseStatus.FAILURE || response === 'Internal Server Error' || !response.layout) {
    yield put(updateLayoutError(response));
  } else {
    yield put(updateLayoutSuccess(response.layout));
  }
}

function* watchDeleteLayoutRequest(action: DeleteLayoutRequest) {
  if (!action.payload) return;

  const id = action.payload;

  const response = yield call(ApiService.deleteUserLayout, id);

  if (response.status === ResponseStatus.FAILURE || response === 'Internal Server Error') {
    yield put(deleteLayoutError(response));
  } else {
    yield put(deleteLayoutSuccess(id));
  }
}

function* watchLayoutsChangesToAnimateWindow() {
  const launcherPosition = yield select(getLauncherPosition);
  const launcherSizeConfig = yield select(getLauncherSizeConfig);
  const layoutsWindow = yield call(getFinWindowByName, LAYOUTS_WINDOW);
  const launcherBounds = yield select(getWindowBounds, getAppUuid());
  const bounds = yield select(getWindowBounds, LAYOUTS_WINDOW);
  const layouts = yield select(getLayouts);

  if (!bounds || !layouts || !layoutsWindow) {
    return;
  }

  const animationBounds = calcBoundsRelativeToLauncher(
    LAYOUTS_WINDOW,
    { ...bounds, height: calcDesiredLayoutsWindowHeight(layouts.length) },
    launcherBounds,
    launcherPosition,
    launcherSizeConfig,
  );

  const transitions: Transition = {
    position: {
      duration: 80,
      left: animationBounds.left,
      relative: false,
      top: animationBounds.top,
    },
    size: {
      duration: 80,
      height: animationBounds.height,
      relative: false,
      width: animationBounds.width,
    },
  };

  yield call(animateWindow, layoutsWindow, transitions, { interrupt: false });
}

function* watchRequestError(action) {
  const error = action.payload;

  const errorMessage = error ? error.message || error : 'Unknown Error';

  // tslint:disable-next-line:no-console
  console.error('Error on', action.type, ':', errorMessage, '\n');

  if (action.meta && action.meta.errorCb) {
    action.meta.errorCb(errorMessage);
  }
}

function* watchGetLayoutsSuccess(action) {
  if (action.meta && action.meta.successCb) {
    action.meta.successCb();
  }

  yield call(watchLayoutsChangesToAnimateWindow);
}

function* watchRequestSuccess(action) {
  if (action.meta && action.meta.successCb) {
    action.meta.successCb(action.payload);
  }

  yield call(watchLayoutsChangesToAnimateWindow);
}

export function* layoutsSaga() {
  yield takeEvery(GET_LAYOUTS.REQUEST, watchGetLayoutsRequest);
  yield takeEvery(GET_LAYOUTS.SUCCESS, watchGetLayoutsSuccess);
  yield takeEvery(GET_LAYOUTS.ERROR, watchRequestError);

  yield takeEvery(RESTORE_LAYOUT.REQUEST, watchRestoreLayoutRequest);
  yield takeEvery(RESTORE_LAYOUT.SUCCESS, watchRestoreLayoutSuccess);
  yield takeEvery(RESTORE_LAYOUT.ERROR, watchRequestError);

  yield takeEvery(CREATE_LAYOUT.REQUEST, watchCreateLayoutRequest);
  yield takeEvery(CREATE_LAYOUT.ERROR, watchRequestError);
  yield takeEvery(CREATE_LAYOUT.SUCCESS, watchRequestSuccess);

  yield takeEvery(UPDATE_LAYOUT.REQUEST, watchUpdateLayoutRequest);
  yield takeEvery(UPDATE_LAYOUT.SUCCESS, watchRequestSuccess);
  yield takeEvery(UPDATE_LAYOUT.ERROR, watchRequestError);

  yield takeEvery(DELETE_LAYOUT.REQUEST, watchDeleteLayoutRequest);
  yield takeEvery(DELETE_LAYOUT.SUCCESS, watchRequestSuccess);
  yield takeEvery(DELETE_LAYOUT.ERROR, watchRequestError);
}
