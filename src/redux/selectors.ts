import { createSelector } from 'reselect';

import { objectsFromIds } from '../utils/byIds';
import { getSystemIcons } from '../utils/getSystemIcons';
import { getAppsById } from './apps/selectors';
import { getAppsLauncherIds, getIsAdmin } from './me/selectors';

export const getAppsLauncherAppList = createSelector(
  getAppsById,
  getAppsLauncherIds,
  objectsFromIds,
);

export const getSystemIconsSelector = createSelector(
  getIsAdmin,
  isAdmin => getSystemIcons(isAdmin),
);
