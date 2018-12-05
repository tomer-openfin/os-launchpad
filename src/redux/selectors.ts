import { createSelector } from 'reselect';

import { objectsFromIds } from '../utils/byIds';
import { getLauncherIcons } from '../utils/getLauncherIcons';
import { getAppsById } from './apps/selectors';
import { getAppsLauncherIds, getIsAdmin } from './me/selectors';

export const getAppsLauncherAppList = createSelector(
  getAppsById,
  getAppsLauncherIds,
  objectsFromIds,
);

export const getTotalLauncherCtas = createSelector(
  getIsAdmin,
  getAppsLauncherAppList,
  (isAdmin, apps) => apps.length + getLauncherIcons(isAdmin).length,
);
