import { createAction } from 'redux-actions';

import { ErrorResponse, MetaWithCallbacks, Theme } from '../../types/commons';
import generateAsyncActionTypes from '../../utils/generateAsyncActionTypes';
import { metaWithCallbacksCreator, payloadIdentityCreator } from '../../utils/metaAndPayloadCreators';
import { OrganizationState } from './types';

export const SAVE_ADMIN_ORG_SETTINGS = generateAsyncActionTypes('SAVE_ADMIN_ORG_SETTINGS');
export const GET_ORG_SETTINGS = generateAsyncActionTypes('GET_ORG_SETTINGS');
export const GET_ADMIN_ORG_SETTINGS = generateAsyncActionTypes('GET_ADMIN_ORG_SETTINGS');
export const SAVE_LOGO = 'SAVE_LOGO';
export const SAVE_ACTIVE_THEME_ID = 'SAVE_ACTIVE_THEME_ID';
export const SET_LOGO = 'SET_LOGO';
export const SET_ACTIVE_THEME_ID = 'SET_ACTIVE_THEME_ID';

export const getOrgSettingsRequest = createAction(GET_ORG_SETTINGS.REQUEST);
export const getOrgSettingsSuccess = createAction(GET_ORG_SETTINGS.SUCCESS);
export const getOrgSettingsError = createAction(GET_ORG_SETTINGS.ERROR);

export const getAdminOrgSettingsRequest = createAction(GET_ADMIN_ORG_SETTINGS.REQUEST);
export const getAdminOrgSettingsSuccess = createAction(GET_ADMIN_ORG_SETTINGS.SUCCESS);
export const getAdminOrgSettingsError = createAction(GET_ADMIN_ORG_SETTINGS.ERROR);

export const saveAdminOrgSettingsRequest = createAction<OrganizationState, MetaWithCallbacks>(
  SAVE_ADMIN_ORG_SETTINGS.REQUEST,
  payloadIdentityCreator,
  metaWithCallbacksCreator,
);
export const saveAdminOrgSettingsSuccess = createAction<OrganizationState, MetaWithCallbacks>(
  SAVE_ADMIN_ORG_SETTINGS.SUCCESS,
  payloadIdentityCreator,
  metaWithCallbacksCreator,
);
export const saveAdminOrgSettingsError = createAction<ErrorResponse, MetaWithCallbacks>(
  SAVE_ADMIN_ORG_SETTINGS.ERROR,
  payloadIdentityCreator,
  metaWithCallbacksCreator,
);

export const saveLogo = createAction<OrganizationState['logo'], MetaWithCallbacks>(SAVE_LOGO, payloadIdentityCreator, metaWithCallbacksCreator);
export const saveActiveThemeId = createAction<Theme['id'], MetaWithCallbacks>(SAVE_ACTIVE_THEME_ID, payloadIdentityCreator, metaWithCallbacksCreator);

export const setLogo = createAction(SET_LOGO);
export const setActiveThemeId = createAction(SET_ACTIVE_THEME_ID);
