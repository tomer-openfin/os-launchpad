import { createAction } from 'redux-actions';

import generateAsyncActionTypes from '../../utils/generateAsyncActionTypes';

export const SAVE_ORG_SETTINGS = generateAsyncActionTypes('SAVE_ORG_SETTINGS');
export const SET_LOGO = 'SET_LOGO';
export const SET_THEME = 'SET_THEME';

export const saveOrgSettingsRequest = createAction(SAVE_ORG_SETTINGS.REQUEST);
export const saveOrgSettingsSuccess = createAction(SAVE_ORG_SETTINGS.SUCCESS);
export const saveOrgSettingsError = createAction(SAVE_ORG_SETTINGS.ERROR);
export const setLogo = createAction(SET_LOGO);
export const setTheme = createAction(SET_THEME);
