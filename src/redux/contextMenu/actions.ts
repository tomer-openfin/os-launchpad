import { createAction } from 'redux-actions';

import generateAsyncActionTypes from '../../utils/generateAsyncActionTypes';
import { ContextMenuRequestPayload, ContextMenuSuccessPayload } from './types';

// Action types
export const CLOSE_CONTEXT_MENU = generateAsyncActionTypes('CLOSE_CONTEXT_MENU');
export const OPEN_CONTEXT_MENU = generateAsyncActionTypes('OPEN_CONTEXT_MENU');

// Action creators
export const closeContextMenuRequest = createAction(CLOSE_CONTEXT_MENU.REQUEST);
export const closeContextMenuSuccess = createAction(CLOSE_CONTEXT_MENU.SUCCESS);
export const openContextMenuRequest = createAction<ContextMenuRequestPayload>(OPEN_CONTEXT_MENU.REQUEST);
export const openContextMenuSuccess = createAction<ContextMenuSuccessPayload>(OPEN_CONTEXT_MENU.SUCCESS);
