import { createAction } from 'redux-actions';

import generateAsyncActionTypes from '../../utils/generateAsyncActionTypes';

export const TOGGLE_NOTIFICATION_CENTER = generateAsyncActionTypes('TOGGLE_NOTIFICATION_CENTER');

export const toggleNotificationCenterRequest = createAction(TOGGLE_NOTIFICATION_CENTER.REQUEST);
export const toggleNotificationCenterSuccess = createAction(TOGGLE_NOTIFICATION_CENTER.SUCCESS);
export const toggleNotificationCenterError = createAction(TOGGLE_NOTIFICATION_CENTER.ERROR);
