import { createAction } from 'redux-actions';

import { ErrorResponse, MetaWithCallbacks, Theme } from '../../types/commons';
import generateAsyncActionTypes from '../../utils/generateAsyncActionTypes';
import { metaWithCallbacksCreator, payloadIdentityCreator } from '../../utils/metaAndPayloadCreators';
import { OrganizationState, OrgImages } from './types';

export const SAVE_ADMIN_ORG_SETTINGS = generateAsyncActionTypes('SAVE_ADMIN_ORG_SETTINGS');
export const GET_ORG_SETTINGS = generateAsyncActionTypes('GET_ORG_SETTINGS');
export const GET_ADMIN_ORG_SETTINGS = generateAsyncActionTypes('GET_ADMIN_ORG_SETTINGS');

export const SAVE_ORG_IMAGE = 'SAVE_ORG_IMAGE';

export const SAVE_ORG_ACTIVE_THEME_ID = 'SAVE_ORG_ACTIVE_THEME_ID';
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

export const saveOrgImage = createAction<{ [key in keyof OrgImages]: string }, MetaWithCallbacks, { [key in keyof OrgImages]: string }, MetaWithCallbacks>(
  SAVE_ORG_IMAGE,
  payloadIdentityCreator,
  metaWithCallbacksCreator,
);

export const saveOrgActiveThemeId = createAction<Theme['id'], MetaWithCallbacks>(SAVE_ORG_ACTIVE_THEME_ID, payloadIdentityCreator, metaWithCallbacksCreator);

export const setOrgActiveThemeId = createAction(SET_ORG_ACTIVE_THEME_ID);
