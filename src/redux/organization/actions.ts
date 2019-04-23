import { MetaWithAsyncHandlers, Theme } from '../../types/commons';
import { createAction, createAsyncActionCreators } from '../utils';
import { OrganizationState, OrgImages } from './types';

const SAVE_ORG_IMAGE = 'SAVE_ORG_IMAGE';
const SAVE_ORG_ACTIVE_THEME_ID = 'SAVE_ORG_ACTIVE_THEME_ID';
const SET_ORG_ACTIVE_THEME_ID = 'SET_ORG_ACTIVE_THEME_ID';
// GET_ORG_SETTINGS
const GET_ORG_SETTINGS_REQUEST = 'GET_ORG_SETTINGS_REQUEST';
const GET_ORG_SETTINGS_SUCCESS = 'GET_ORG_SETTINGS_SUCCESS';
const GET_ORG_SETTINGS_FAILURE = 'GET_ORG_SETTINGS_FAILURE';
// GET_ADMIN_ORG_SETTINGS
const GET_ADMIN_ORG_SETTINGS_REQUEST = 'GET_ADMIN_ORG_SETTINGS_REQUEST';
const GET_ADMIN_ORG_SETTINGS_SUCCESS = 'GET_ADMIN_ORG_SETTINGS_SUCCESS';
const GET_ADMIN_ORG_SETTINGS_FAILURE = 'GET_ADMIN_ORG_SETTINGS_FAILURE';
// SAVE_ADMIN_ORG_SETTINGS
const SAVE_ADMIN_ORG_SETTINGS_REQUEST = 'SAVE_ADMIN_ORG_SETTINGS_REQUEST';
const SAVE_ADMIN_ORG_SETTINGS_SUCCESS = 'SAVE_ADMIN_ORG_SETTINGS_SUCCESS';
const SAVE_ADMIN_ORG_SETTINGS_FAILURE = 'SAVE_ADMIN_ORG_SETTINGS_FAILURE';

export const saveOrgImage = createAction(SAVE_ORG_IMAGE)<{ [key in keyof OrgImages]: string }, MetaWithAsyncHandlers<OrganizationState>>();
export const saveOrgActiveThemeId = createAction(SAVE_ORG_ACTIVE_THEME_ID)<Theme['id'], MetaWithAsyncHandlers<OrganizationState>>();
export const setOrgActiveThemeId = createAction(SET_ORG_ACTIVE_THEME_ID)<Theme['id'], MetaWithAsyncHandlers<OrganizationState>>();
export const getOrgSettings = createAsyncActionCreators(GET_ORG_SETTINGS_REQUEST, GET_ORG_SETTINGS_SUCCESS, GET_ORG_SETTINGS_FAILURE)<
  void,
  Partial<OrganizationState>,
  Error
>();
export const getAdminOrgSettings = createAsyncActionCreators(GET_ADMIN_ORG_SETTINGS_REQUEST, GET_ADMIN_ORG_SETTINGS_SUCCESS, GET_ADMIN_ORG_SETTINGS_FAILURE)<
  void,
  Partial<OrganizationState>,
  Error
>();
export const saveAdminOrgSettings = createAsyncActionCreators(
  SAVE_ADMIN_ORG_SETTINGS_REQUEST,
  SAVE_ADMIN_ORG_SETTINGS_SUCCESS,
  SAVE_ADMIN_ORG_SETTINGS_FAILURE,
)<OrganizationState, OrganizationState, Error>();
