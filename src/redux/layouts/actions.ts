import { createAction } from 'redux-actions';

import { Layout } from 'openfin-layouts/dist/client/types';
import { ErrorResponse, UserLayout } from '../../types/commons';
import generateAsyncActionTypes from '../../utils/generateAsyncActionTypes';
import { GetLayoutsSuccessPayload } from './types';

interface UpdateLayout {
  id: UserLayout['id'];
  name: UserLayout['name'];
  updateLayout: boolean;
}

// Action types
export const GET_LAYOUTS = generateAsyncActionTypes('GET_LAYOUTS');
export const RESTORE_LAYOUT = generateAsyncActionTypes('RESTORE_LAYOUT');
export const SAVE_LAYOUT = 'SAVE_LAYOUT';
export const CREATE_LAYOUT = generateAsyncActionTypes('CREATE_LAYOUT');
export const UPDATE_LAYOUT = generateAsyncActionTypes('UPDATE_LAYOUT');
export const DELETE_LAYOUT = generateAsyncActionTypes('DELETE_LAYOUT');

// Action creators
export const getLayoutsRequest = createAction(GET_LAYOUTS.REQUEST);
export const getLayoutsSuccess = createAction<GetLayoutsSuccessPayload>(GET_LAYOUTS.SUCCESS);
export const getLayoutsError = createAction<ErrorResponse>(GET_LAYOUTS.ERROR);

export const restoreLayoutRequest = createAction<UserLayout['id']>(RESTORE_LAYOUT.REQUEST);
export const restoreLayoutSuccess = createAction<Layout>(RESTORE_LAYOUT.SUCCESS);
export const restoreLayoutError = createAction<ErrorResponse>(RESTORE_LAYOUT.ERROR);

export const saveLayout = createAction<UserLayout['id']>(SAVE_LAYOUT);

export const createLayoutRequest = createAction<UserLayout['id']>(CREATE_LAYOUT.REQUEST);
export const createLayoutSuccess = createAction(CREATE_LAYOUT.SUCCESS);
export const createLayoutError = createAction<ErrorResponse>(CREATE_LAYOUT.ERROR);

export const updateLayoutRequest = createAction<UpdateLayout>(UPDATE_LAYOUT.REQUEST);
export const updateLayoutSuccess = createAction<UserLayout>(UPDATE_LAYOUT.SUCCESS);
export const updateLayoutError = createAction<ErrorResponse>(UPDATE_LAYOUT.ERROR);

export const deleteLayoutRequest = createAction<UserLayout['id']>(DELETE_LAYOUT.REQUEST);
export const deleteLayoutSuccess = createAction<UserLayout['id']>(DELETE_LAYOUT.SUCCESS);
export const deleteLayoutError = createAction<ErrorResponse>(DELETE_LAYOUT.ERROR);
