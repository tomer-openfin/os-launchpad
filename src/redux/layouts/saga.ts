import { all, call, put, race, select, take, takeEvery } from 'redux-saga/effects';

import ApiService from '../../services/ApiService';
import { ErrorResponse, ResponseStatus, UserLayout } from '../../types/commons';
import { bindFinAppEventHandlers } from '../../utils/finAppEventHandlerHelpers';
import { generateLayout, restoreLayout } from '../../utils/openfinLayouts';
import { AppStatusOrigins, AppStatusStates, getApps, getAppsStatusById, openFinAppSuccess, setFinAppStatusState } from '../apps';
import {
  CREATE_LAYOUT,
  createLayoutError,
  createLayoutRequest,
  createLayoutSuccess,
  DELETE_LAYOUT,
  deleteLayoutError,
  deleteLayoutSuccess,
  GET_LAYOUTS,
  getLayoutsError,
  getLayoutsRequest,
  getLayoutsSuccess,
  RESTORE_LAYOUT,
  restoreLayoutError,
  restoreLayoutSuccess,
  SAVE_LAYOUT,
  UPDATE_LAYOUT,
  updateLayoutError,
  updateLayoutRequest,
  updateLayoutSuccess,
} from './actions';
import { getLayoutById, getLayoutsIds } from './selectors';
import { CreateLayoutRequest, RestoreLayoutRequest, RestoreLayoutSuccess, UpdateLayoutRequest } from './types';

const buildErrorResponse = (message: string): ErrorResponse => ({ status: ResponseStatus.FAILURE, message });

function* watchGetLayoutRequest() {
  const response = yield call(ApiService.getUserLayouts);

  if (!response || !response.length || response.status === ResponseStatus.FAILURE) {
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
          console.log('Could not find manifestUrl in list of applications.', manifestUrl, uuid);
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
        console.log('Could not find manifestUrl in list of applications.', manifestUrl, uuid);
        return;
      }

      const { id } = matchingApp;
      const appStatus = appsStatusById[id];
      if (appStatus && appStatus.state === AppStatusStates.Loading && appStatus.origin === AppStatusOrigins.LayoutRestore) {
        const wrappedApp = fin.desktop.Application.wrap(uuid);
        bindFinAppEventHandlers(window.store.dispatch, wrappedApp, id);

        return put(openFinAppSuccess({ id, uuid, origin: AppStatusOrigins.LayoutRestore }));
      }

      return;
    }),
  );
}

// TEMPORARY while we are only dealing with a single layout (always the first)
// once users can manipulate an array of layouts we can go straight to create update and delete
function* watchSaveLayout() {
  yield put(getLayoutsRequest());

  const { success, failure } = yield race({ success: take(GET_LAYOUTS.SUCCESS), failure: take(GET_LAYOUTS.ERROR) });

  if (success) {
    const layoutIds = yield select(getLayoutsIds);
    const firstLayoutId: UserLayout['id'] = layoutIds[0];
    const firstLayout: UserLayout = yield select(getLayoutById, firstLayoutId);

    if (!firstLayout) {
      yield put(createLayoutRequest('newLayout'));
    } else {
      const { id, name } = firstLayout;
      yield put(updateLayoutRequest({ id, name, updateLayout: true }));
    }
  }
}

function* watchCreateLayoutRequest(action: CreateLayoutRequest) {
  const name = action.payload || 'layout';

  const layout = yield call(generateLayout);

  const userLayout = { name, layout };

  const response = yield call(ApiService.createUserLayout, userLayout);

  if (response.status === ResponseStatus.FAILURE || response === 'Internal Server Error' || !response.layout) {
    yield put(createLayoutError(response));
  } else {
    yield put(createLayoutSuccess(response.layout));
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

function* watchDeleteLayoutRequest(action: UpdateLayoutRequest) {
  if (!action.payload) return;

  const { id } = action.payload;

  const response = yield call(ApiService.updateUserLayout, id);

  if (response.status === ResponseStatus.FAILURE || response === 'Internal Server Error') {
    yield put(deleteLayoutError(response));
  } else {
    yield put(deleteLayoutSuccess(id));
  }
}

function* watchRequestError(action) {
  const error = action.payload;

  const errorMessage = error ? error.message || error : 'Unknown Error';

  // tslint:disable-next-line:no-console
  console.log('Error on', action.type, ':', errorMessage, '\n');

  if (action.meta && action.meta.errorCb) {
    action.meta.errorCb(errorMessage);
  }
}

export function* layoutsSaga() {
  yield takeEvery(GET_LAYOUTS.REQUEST, watchGetLayoutRequest);

  yield takeEvery(RESTORE_LAYOUT.REQUEST, watchRestoreLayoutRequest);
  yield takeEvery(RESTORE_LAYOUT.SUCCESS, watchRestoreLayoutSuccess);

  yield takeEvery(SAVE_LAYOUT, watchSaveLayout);

  yield takeEvery(CREATE_LAYOUT.REQUEST, watchCreateLayoutRequest);
  yield takeEvery(UPDATE_LAYOUT.REQUEST, watchUpdateLayoutRequest);
  yield takeEvery(DELETE_LAYOUT.REQUEST, watchDeleteLayoutRequest);

  yield takeEvery(GET_LAYOUTS.ERROR, watchRequestError);
  yield takeEvery(CREATE_LAYOUT.ERROR, watchRequestError);
  yield takeEvery(UPDATE_LAYOUT.ERROR, watchRequestError);
  yield takeEvery(DELETE_LAYOUT.ERROR, watchRequestError);
}
