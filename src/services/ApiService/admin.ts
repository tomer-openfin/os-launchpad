import { Theme } from '../../types/commons';

import { OrganizationState } from '../../redux/organization/types';
import API from './api';
import { createGetOptions } from './requestOptions';

export const getOrgSettings = (): Promise<OrganizationState> => {
  const options = createGetOptions();

  return fetch(API.ORG_SETTINGS, options).then(resp => resp.json());
};

/**
 * Get themes
 *
 * @returns {Promise<Theme[]>}
 */
export const getAdminOrgSettings = (): Promise<Theme[]> => {
  const options = createGetOptions();

  return fetch(API.ADMIN_SETTINGS, options).then(resp => resp.json());
};

export const saveAdminTheme = (theme: Theme) => {
  // tslint:disable-next-line:no-console
  console.log('Saving organization theme as:', theme);
  return Promise.resolve();
};

export const saveAdminLogo = (file: File) => {
  // tslint:disable-next-line:no-console
  console.log('Saving organization logo file:', file);
  const newFileUrl = URL.createObjectURL(file);
  return Promise.resolve(newFileUrl);
};
