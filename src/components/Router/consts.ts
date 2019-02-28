export const ADMIN_SETTINGS_ROUTES = {
  ADMIN_SETTINGS_DELETE: '/admin/settings/delete',
  ADMIN_SETTINGS_EDIT: '/admin/settings/edit',
};

export const ADMIN_APPS_ROUTES = {
  ADMIN_APPS_DELETE: '/admin/apps/delete',
  ADMIN_APPS_EDIT: '/admin/apps/edit',
  ADMIN_APPS_NEW: '/admin/apps/new',
};

export const ADMIN_USERS_ROUTES = {
  ADMIN_USERS_DELETE: `/admin/users/delete`,
  ADMIN_USERS_EDIT: `/admin/users/edit`,
  ADMIN_USERS_IMPORT: `/admin/users/import`,
  ADMIN_USERS_NEW: `/admin/users/new`,
};

export const ADMIN_ROUTES = {
  ADMIN: '/admin',
  ADMIN_APPS: '/admin/apps',
  ...ADMIN_APPS_ROUTES,
  ADMIN_SETTINGS: `/admin/settings`,
  ...ADMIN_SETTINGS_ROUTES,
  ADMIN_USERS: '/admin/users',
  ...ADMIN_USERS_ROUTES,
};

export const SETTINGS_ROUTES = {
  SETTINGS_LAUNCHER_MONITOR: '/settings/launcher-monitor',
  SETTINGS_UPDATE_PASSWORD: '/settings/update-password',
};

export const ROUTES = {
  ...ADMIN_ROUTES,
  APP_DIRECTORY: '/app-directory',
  APP_LAUNCHER_OVERFLOW: '/app-overflow',
  CONTEXT_MENU: '/context-menu',
  FORGOT_PASSWORD: '/forgot-password',
  HOME: '/',
  LAYOUTS: '/layouts',
  LOGIN: '/login',
  LOGOUT: '/logout',
  SETTINGS: '/settings',
  ...SETTINGS_ROUTES,
};
