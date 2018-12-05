import { call, put, select, takeEvery } from 'redux-saga/effects';

import ApiService from '../../services/ApiService';
import { ErrorResponse, ResponseStatus, UserLayout } from '../../types/commons';
import { generateLayout, restoreLayout } from '../../utils/openfinLayouts';
import {
  CREATE_LAYOUT,
  createLayoutError,
  createLayoutRequest,
  createLayoutSuccess,
  DELETE_LAYOUT,
  deleteLayoutError,
  deleteLayoutSuccess,
  GET_LAYOUTS,
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
import { CreateLayoutRequest, RestoreLayoutRequest, UpdateLayoutRequest } from './types';

const buildErrorResponse = (message: string): ErrorResponse => ({ status: ResponseStatus.FAILURE, message });

function* watchGetLayoutRequest() {
  const result = yield call(ApiService.getUserLayouts);

  yield put(getLayoutsSuccess(result));
}

function* watchRestoreLayout(action: RestoreLayoutRequest) {
  const layoutId: string | undefined = action.payload;

  if (!layoutId) return yield put(restoreLayoutError(buildErrorResponse('Error getting layout for restore')));

  const userLayout: UserLayout = yield select(getLayoutById, layoutId);

  if (!userLayout) return yield put(restoreLayoutError(buildErrorResponse('Error getting layout for restore')));

  const { layout } = userLayout;

  if (!layout) return yield put(restoreLayoutError(buildErrorResponse('Error getting layout for restore')));

  yield call(restoreLayout, layout);

  yield put(restoreLayoutSuccess());
}

// TEMPORARY while we are only dealing with a single layout (always the first)
// once users can manipulate an array of layouts we can go straight to create update and delete
function* watchSaveLayout() {
  yield put(getLayoutsRequest());

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

  yield takeEvery(RESTORE_LAYOUT.REQUEST, watchRestoreLayout);

  yield takeEvery(SAVE_LAYOUT, watchSaveLayout);

  yield takeEvery(CREATE_LAYOUT.REQUEST, watchCreateLayoutRequest);
  yield takeEvery(UPDATE_LAYOUT.REQUEST, watchUpdateLayoutRequest);
  yield takeEvery(DELETE_LAYOUT.REQUEST, watchDeleteLayoutRequest);

  yield takeEvery(CREATE_LAYOUT.ERROR, watchRequestError);
  yield takeEvery(UPDATE_LAYOUT.ERROR, watchRequestError);
  yield takeEvery(DELETE_LAYOUT.ERROR, watchRequestError);
}
