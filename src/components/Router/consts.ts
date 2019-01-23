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
  ADMIN_USERS: '/admin/users',
  ...ADMIN_USERS_ROUTES,
};

export const ROUTES = {
  ...ADMIN_ROUTES,
  APP_DIRECTORY: '/app-directory',
  APP_LAUNCHER_OVERFLOW: '/app-overflow',
  CONTEXT_MENU: '/context-menu',
  HOME: '/',
  LAYOUTS: '/layouts',
  LOGIN: '/login',
  LOGOUT: '/logout',
  SETTINGS: '/settings',
};
