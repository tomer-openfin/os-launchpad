import AppData from '../../../samples/AppData';
import { ApiFailureResponse, ApiResponseStatus, ApiSuccessResponse, App } from '../../../types/commons';
import { CreateAdminApp, DeleteAdminApp, GetAdminApp, GetAdminApps, GetDirectoryAppList, UpdateAdminApp } from '../apps';
import { NotFoundResponse } from './utils/commons';

/**
 * Get apps
 */
export const getDirectoryAppList: GetDirectoryAppList = () => {
  const response: ApiSuccessResponse<App[]> = { status: ApiResponseStatus.Success, data: AppData };
  return Promise.resolve(response);
};

/**
 * Get admin apps
 */
export const getAdminApps: GetAdminApps = () => {
  const response: ApiSuccessResponse<App[]> = { status: ApiResponseStatus.Success, data: AppData };
  return Promise.resolve(response);
};

/**
 * Get admin app
 */
export const getAdminApp: GetAdminApp = app => {
  const appDatum = AppData.find(data => data.id === app.id);
  if (appDatum) {
    const response: ApiSuccessResponse<App> = { status: ApiResponseStatus.Success, data: appDatum };
    return Promise.resolve(response);
  }

  const failureResponse: ApiFailureResponse = { status: ApiResponseStatus.Failure, message: NotFoundResponse.status };
  return Promise.resolve(failureResponse);
};

/**
 * Create new admin app
 */
export const createAdminApp: CreateAdminApp = app => {
  const response: ApiSuccessResponse<App> = { status: ApiResponseStatus.Success, data: app };
  return Promise.resolve(response);
};

/**
 * Update an admin app
 */
export const updateAdminApp: UpdateAdminApp = app => {
  const response: ApiSuccessResponse<App> = { status: ApiResponseStatus.Success, data: app };
  return Promise.resolve(response);
};

/**
 * Delete an admin app
 */
export const deleteAdminApp: DeleteAdminApp = app => {
  const response: ApiSuccessResponse<undefined> = { status: ApiResponseStatus.Success, data: undefined };
  return Promise.resolve(response);
};
