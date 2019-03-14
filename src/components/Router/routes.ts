import * as React from 'react';

import { ROUTES } from './consts';

import Admin from '../Admin';
import AdminApps, { asRoute as asAdminAppsRoute } from '../AdminApps';
import AdminOrgImageUpload from '../AdminOrgImageUpload';
import AdminUsers, { asRoute as asAdminUsersRoute } from '../AdminUsers';
import App from '../App';
import AppDirectory from '../AppDirectory';
import AppOverflow from '../AppOverflow';
import ConfirmRevertImage from '../ConfirmRevertImage';
import ContextMenu from '../ContextMenu';
import ForgotPassword, { asRoute as asForgotPasswordRoute } from '../ForgotPassword';
import Layouts from '../Layouts';
import Login from '../Login';
import Logout from '../Logout';
import OrganizationSettings from '../OrganizationSettings';
import Settings, { asRoute as asSettingsRoutes } from '../Settings';

export interface AppRoute {
  // tslint:disable:no-any
  Component: React.ComponentType<any>;
  exact: boolean;
  path: string;
  children?: AppRoute[];
}

export const adminSettingsRoutes: AppRoute[] = [
  {
    Component: AdminOrgImageUpload,
    exact: true,
    path: ROUTES.ADMIN_SETTINGS_EDIT,
  },
  {
    Component: ConfirmRevertImage,
    exact: true,
    path: ROUTES.ADMIN_SETTINGS_DELETE,
  },
];

export const adminRoutes: AppRoute[] = [
  {
    Component: OrganizationSettings,
    children: adminSettingsRoutes,
    exact: false,
    path: ROUTES.ADMIN_SETTINGS,
  },
  {
    Component: asAdminAppsRoute(AdminApps),
    exact: false,
    path: ROUTES.ADMIN_APPS,
  },
  {
    Component: asAdminUsersRoute(AdminUsers),
    exact: false,
    path: ROUTES.ADMIN_USERS,
  },
];

export const routes: AppRoute[] = [
  {
    Component: Admin,
    children: adminRoutes,
    exact: false,
    path: ROUTES.ADMIN,
  },
  {
    Component: App,
    exact: true,
    path: ROUTES.HOME,
  },
  {
    Component: Login,
    exact: true,
    path: ROUTES.LOGIN,
  },
  {
    Component: asForgotPasswordRoute(ForgotPassword),
    exact: true,
    path: ROUTES.FORGOT_PASSWORD,
  },
  {
    Component: AppOverflow,
    exact: true,
    path: ROUTES.APP_LAUNCHER_OVERFLOW,
  },
  {
    Component: Layouts,
    exact: true,
    path: ROUTES.LAYOUTS,
  },
  {
    Component: Logout,
    exact: true,
    path: ROUTES.LOGOUT,
  },
  {
    Component: AppDirectory,
    exact: true,
    path: ROUTES.APP_DIRECTORY,
  },
  {
    Component: asSettingsRoutes(Settings),
    exact: false,
    path: ROUTES.SETTINGS,
  },
  {
    Component: ContextMenu,
    exact: true,
    path: ROUTES.CONTEXT_MENU,
  },
];
