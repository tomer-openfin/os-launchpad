import { Workspace } from 'openfin-layouts/dist/client/types';
import { createAction } from 'redux-actions';

import { ErrorResponse, MetaWithCallbacks, UserLayout } from '../../types/commons';
import generateAsyncActionTypes from '../../utils/generateAsyncActionTypes';
import { metaWithCallbacksCreator, payloadIdentityCreator } from '../../utils/metaAndPayloadCreators';
import { CreateOrUpdateSuccessPayload, GetLayoutsSuccessPayload, UpdateLayoutRequestPayload, UpdateSuccessPayload } from './types';

// Action types
export const GET_LAYOUTS = generateAsyncActionTypes('GET_LAYOUTS');
export const RESTORE_LAYOUT = generateAsyncActionTypes('RESTORE_LAYOUT');
export const CREATE_LAYOUT = generateAsyncActionTypes('CREATE_LAYOUT');
export const DISMISS_UNDO_UPDATE_LAYOUT = generateAsyncActionTypes('DISMISS_UNDO_UPDATE_LAYOUT');
export const UNDO_UPDATE_LAYOUT = generateAsyncActionTypes('UNDO_UPDATE_LAYOUT');
export const UPDATE_LAYOUT = generateAsyncActionTypes('UPDATE_LAYOUT');
export const DELETE_LAYOUT = generateAsyncActionTypes('DELETE_LAYOUT');
export const SAVE_LAYOUT = generateAsyncActionTypes('SAVE_LAYOUT');

// Action creators
export const getLayoutsRequest = createAction(GET_LAYOUTS.REQUEST);
export const getLayoutsSuccess = createAction<GetLayoutsSuccessPayload>(GET_LAYOUTS.SUCCESS);
export const getLayoutsError = createAction<ErrorResponse>(GET_LAYOUTS.ERROR);

export const restoreLayoutRequest = createAction<UserLayout['id']>(RESTORE_LAYOUT.REQUEST);
export const restoreLayoutSuccess = createAction<Workspace>(RESTORE_LAYOUT.SUCCESS);
export const restoreLayoutError = createAction<ErrorResponse>(RESTORE_LAYOUT.ERROR);

export const createLayoutRequest = createAction<UserLayout['name'], MetaWithCallbacks>(CREATE_LAYOUT.REQUEST, payloadIdentityCreator, metaWithCallbacksCreator);
export const createLayoutSuccess = createAction<CreateOrUpdateSuccessPayload, MetaWithCallbacks>(
  CREATE_LAYOUT.SUCCESS,
  payloadIdentityCreator,
  metaWithCallbacksCreator,
);
export const createLayoutError = createAction<ErrorResponse, MetaWithCallbacks>(CREATE_LAYOUT.ERROR, payloadIdentityCreator, metaWithCallbacksCreator);

export const dismissUndoUpdateLayoutRequest = createAction<MetaWithCallbacks>(DISMISS_UNDO_UPDATE_LAYOUT.REQUEST, undefined, payloadIdentityCreator);
export const dismissUndoUpdateLayoutSuccess = createAction<MetaWithCallbacks>(DISMISS_UNDO_UPDATE_LAYOUT.SUCCESS, undefined, payloadIdentityCreator);
export const dismissUndoUpdateLayoutError = createAction<MetaWithCallbacks>(DISMISS_UNDO_UPDATE_LAYOUT.ERROR, undefined, payloadIdentityCreator);

export const undoUpdateLayoutRequest = createAction<MetaWithCallbacks>(UNDO_UPDATE_LAYOUT.REQUEST, undefined, payloadIdentityCreator);
export const undoUpdateLayoutSuccess = createAction<MetaWithCallbacks>(UNDO_UPDATE_LAYOUT.SUCCESS, undefined, payloadIdentityCreator);
export const undoUpdateLayoutError = createAction<MetaWithCallbacks>(UNDO_UPDATE_LAYOUT.ERROR, undefined, payloadIdentityCreator);

export const updateLayoutRequest = createAction<UpdateLayoutRequestPayload, MetaWithCallbacks>(
  UPDATE_LAYOUT.REQUEST,
  payloadIdentityCreator,
  metaWithCallbacksCreator,
);
export const updateLayoutSuccess = createAction<UpdateSuccessPayload, MetaWithCallbacks>(
  UPDATE_LAYOUT.SUCCESS,
  payloadIdentityCreator,
  metaWithCallbacksCreator,
);
export const updateLayoutError = createAction<ErrorResponse, MetaWithCallbacks>(UPDATE_LAYOUT.ERROR, payloadIdentityCreator, metaWithCallbacksCreator);

export const deleteLayoutRequest = createAction<UserLayout['id']>(DELETE_LAYOUT.REQUEST);
export const deleteLayoutSuccess = createAction<UserLayout['id']>(DELETE_LAYOUT.SUCCESS);
export const deleteLayoutError = createAction<ErrorResponse>(DELETE_LAYOUT.ERROR);

export const saveLayoutRequest = createAction<UserLayout['name'], MetaWithCallbacks>(SAVE_LAYOUT.REQUEST, payloadIdentityCreator, metaWithCallbacksCreator);
export const saveLayoutSuccess = createAction<UserLayout, MetaWithCallbacks>(SAVE_LAYOUT.SUCCESS, payloadIdentityCreator, metaWithCallbacksCreator);
export const saveLayoutError = createAction<ErrorResponse, MetaWithCallbacks>(SAVE_LAYOUT.ERROR, payloadIdentityCreator, metaWithCallbacksCreator);
