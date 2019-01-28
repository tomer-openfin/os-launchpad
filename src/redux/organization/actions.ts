import { createAction } from 'redux-actions';

import { ErrorResponse, MetaWithCallbacks, Theme } from '../../types/commons';
import generateAsyncActionTypes from '../../utils/generateAsyncActionTypes';
import { metaWithCallbacksCreator, payloadIdentityCreator } from '../../utils/metaAndPayloadCreators';
import { OrganizationState } from './types';

export const SAVE_ADMIN_ORG_SETTINGS = generateAsyncActionTypes('SAVE_ADMIN_ORG_SETTINGS');
export const GET_ORG_SETTINGS = generateAsyncActionTypes('GET_ORG_SETTINGS');
export const GET_ADMIN_ORG_SETTINGS = generateAsyncActionTypes('GET_ADMIN_ORG_SETTINGS');

export const SAVE_ORG_AUTO_LOGIN = 'SAVE_ORG_AUTO_LOGIN';
export const SAVE_ORG_LOGO = 'SAVE_ORG_LOGO';
export const SAVE_ORG_ACTIVE_THEME_ID = 'SAVE_ORG_ACTIVE_THEME_ID';
export const SET_ORG_LOGO = 'SET_ORG_LOGO';
export const SET_ORG_ACTIVE_THEME_ID = 'SET_ORG_ACTIVE_THEME_ID';

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
export const saveOrgAutoLogin =
  createAction<OrganizationState['autoLogin'], MetaWithCallbacks>(SAVE_ORG_AUTO_LOGIN, payloadIdentityCreator, metaWithCallbacksCreator);
export const saveOrgLogo =
  createAction<OrganizationState['logo'], MetaWithCallbacks>(SAVE_ORG_LOGO, payloadIdentityCreator, metaWithCallbacksCreator);
export const saveOrgActiveThemeId =
  createAction<Theme['id'], MetaWithCallbacks>(SAVE_ORG_ACTIVE_THEME_ID, payloadIdentityCreator, metaWithCallbacksCreator);

export const setOrgLogo = createAction(SET_ORG_LOGO);
export const setOrgActiveThemeId = createAction(SET_ORG_ACTIVE_THEME_ID);
