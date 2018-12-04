import { Theme } from '../../types/commons';
import DEFAULT_THEMES from '../../utils/defaultThemes';

import * as logoIcon from '../../assets/Logo.svg';

import { OrganizationState } from '../../redux/organization/types';

export const getAdminOrganizationSettings = (): Promise<OrganizationState> => {
  return Promise.resolve({
    logo: logoIcon,
    theme: DEFAULT_THEMES[0],
  });
};

/**
 * Get themes
 *
 * @returns {Promise<Theme[]>}
 */
export const getAdminThemes = (): Promise<Theme[]> => {
  return Promise.resolve(DEFAULT_THEMES);
  // const options = createGetOptions();
  // return fetch(API.THEMES, options)
  //   .then(resp => resp.json())
  //   .then(resp => resp.themes as Theme[]);
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
