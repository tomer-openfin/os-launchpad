import { APIResponse } from '../../types/commons';

import { OrganizationState } from '../../redux/organization/types';
import API from './api';
import { createGetOptions, createPostOptions } from './requestOptions';

export const getOrgSettings = (): Promise<OrganizationState> => {
  const options = createGetOptions();

  return fetch(API.ORG_SETTINGS, options)
    .then(resp => resp.json())
    .then(json => {
      if (!json) {
        throw new Error(`${API.ORG_SETTINGS} did not return a valid resource: ${json}`);
      }
      return json;
    });
};

export const getAdminOrgSettings = (): Promise<APIResponse> => {
  const options = createGetOptions();

  return fetch(API.ADMIN_SETTINGS, options)
    .then(resp => resp.json())
    .then(json => {
      if (!json) {
        throw new Error(`${API.ORG_SETTINGS} did not return a valid resource: ${json}`);
      }
      return json;
    });
};

export const saveAdminOrgSettings = (settings: OrganizationState): Promise<APIResponse> => {
  const options = createPostOptions({ settings });

  return fetch(API.ADMIN_SETTINGS, options).then(resp => resp.json());
};
