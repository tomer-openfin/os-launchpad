import { APIResponse } from '../../types/commons';

import { OrganizationState } from '../../redux/organization/types';
import API from './api';
import { createGetOptions, createPostOptions } from './requestOptions';

export const getOrgSettings = (): Promise<OrganizationState> => {
  const options = createGetOptions();

  return fetch(API.ORG_SETTINGS, options).then(resp => resp.json());
};

export const getAdminOrgSettings = (): Promise<APIResponse> => {
  const options = createGetOptions();

  return fetch(API.ADMIN_SETTINGS, options).then(resp => resp.json());
};

export const saveAdminOrgSettings = (settings: OrganizationState): Promise<APIResponse> => {
  const options = createPostOptions({ settings });

  return fetch(API.ADMIN_SETTINGS, options).then(resp => resp.json());
};
