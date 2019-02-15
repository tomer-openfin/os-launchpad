import { ROUTES } from '../Router/consts';

export const ADMIN_TABS = {
  [ROUTES.ADMIN_SETTINGS]: {
    exact: false,
    title: 'Enterprise',
  },
  [ROUTES.ADMIN_APPS]: {
    exact: false,
    title: 'Apps',
  },
  [ROUTES.ADMIN_USERS]: {
    exact: false,
    title: 'Users',
  },
};

export const ADMIN_TABS_PATHS = Object.keys(ADMIN_TABS);
