import { generateLayout, restoreLayout } from 'openfin-layouts';
import { Layout } from 'openfin-layouts/dist/client/types';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import ApiService from '../../services/ApiService';
import { GET_LAYOUTS, getLayoutsSuccess, RESTORE_LAYOUT, SAVE_LAYOUT, saveLayoutSuccess } from './actions';
import { RestoreLayout, SaveLayoutRequest } from './types';

function* watchGetLayoutRequest() {
  const result = yield call(ApiService.getLayouts);
  yield put(getLayoutsSuccess(result));
}

function* watchRestoreLayout(action: RestoreLayout) {
  const layout = action.payload;
  if (!layout || layout.apps === undefined) {
    return;
  }

  yield call(restoreLayout, layout);
}

function* watchSaveLayoutRequest(action: SaveLayoutRequest) {
  let layout = action.payload;
  if (!layout) {
    layout = yield call(generateLayout);
  }

  // tslint:disable-next-line:no-console
  console.log('watchSaveLayoutRequest', action);

  // tslint:disable:no-console
  console.log('-- attempting to save layout--', layout);

  yield call(ApiService.saveLayout, layout as Layout);
  yield put(saveLayoutSuccess());
}

export function* layoutsSaga() {
  yield takeEvery(GET_LAYOUTS.REQUEST, watchGetLayoutRequest);
  yield takeEvery(RESTORE_LAYOUT, watchRestoreLayout);
  yield takeEvery(SAVE_LAYOUT.REQUEST, watchSaveLayoutRequest);
}
