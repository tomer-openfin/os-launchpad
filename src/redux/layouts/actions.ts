import { createAction } from 'redux-actions';

import { Layout } from 'openfin-layouts/dist/client/types';
import { ErrorResponse, MetaWithCallbacks, UserLayout } from '../../types/commons';
import generateAsyncActionTypes from '../../utils/generateAsyncActionTypes';
import { metaWithCallbacksCreator, payloadIdentityCreator } from '../../utils/metaAndPayloadCreators';
import { GetLayoutsSuccessPayload } from './types';

export interface UpdateLayout {
  id: UserLayout['id'];
  name: UserLayout['name'];
  updateLayout: boolean;
}

// Action types
export const GET_LAYOUTS = generateAsyncActionTypes('GET_LAYOUTS');
export const RESTORE_LAYOUT = generateAsyncActionTypes('RESTORE_LAYOUT');
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

export const createLayoutRequest = createAction<UserLayout['name'], MetaWithCallbacks>(CREATE_LAYOUT.REQUEST, payloadIdentityCreator, metaWithCallbacksCreator);
export const createLayoutSuccess = createAction<UserLayout, MetaWithCallbacks>(CREATE_LAYOUT.SUCCESS, payloadIdentityCreator, metaWithCallbacksCreator);
export const createLayoutError = createAction<ErrorResponse, MetaWithCallbacks>(CREATE_LAYOUT.ERROR, payloadIdentityCreator, metaWithCallbacksCreator);

export const updateLayoutRequest = createAction<UpdateLayout>(UPDATE_LAYOUT.REQUEST);
export const updateLayoutSuccess = createAction<UserLayout>(UPDATE_LAYOUT.SUCCESS);
export const updateLayoutError = createAction<ErrorResponse>(UPDATE_LAYOUT.ERROR);

export const deleteLayoutRequest = createAction<UserLayout['id']>(DELETE_LAYOUT.REQUEST);
export const deleteLayoutSuccess = createAction<UserLayout['id']>(DELETE_LAYOUT.SUCCESS);
export const deleteLayoutError = createAction<ErrorResponse>(DELETE_LAYOUT.ERROR);
