import { Layout } from 'openfin-layouts/dist/client/types';
import { createAction } from 'redux-actions';

import { ErrorResponse } from '../../types/commons';
import generateAsyncActionTypes from '../../utils/generateAsyncActionTypes';
import {
  GetLayoutsSuccessPayload,
} from './types';

// Action types
export const GET_LAYOUTS = generateAsyncActionTypes('GET_LAYOUTS');
export const RESTORE_LAYOUT = 'RESTORE_LAYOUT';
export const SAVE_LAYOUT = generateAsyncActionTypes('SAVE_LAYOUT');

// Action creators
export const getLayoutsRequest = createAction(GET_LAYOUTS.REQUEST);
export const getLayoutsSuccess = createAction<GetLayoutsSuccessPayload>(GET_LAYOUTS.SUCCESS);
export const getLayoutsError = createAction<ErrorResponse>(GET_LAYOUTS.ERROR);
export const restoreLayout = createAction<Layout>(RESTORE_LAYOUT);
export const saveLayoutRequest = createAction<Layout>(SAVE_LAYOUT.REQUEST);
export const saveLayoutSuccess = createAction(SAVE_LAYOUT.SUCCESS);
export const saveLayoutError = createAction<ErrorResponse>(SAVE_LAYOUT.ERROR);
