import * as React from 'react';

import Admin from '../Admin';
import AdminApps from '../AdminApps';
import AdminUsers from '../AdminUsers';
import App from '../App';
import AppDirectory from '../AppDirectory';
import AppOverflow from '../AppOverflow';
import ConfirmAppDelete from '../ConfirmAppDelete';
import ConfirmUserDelete from '../ConfirmUserDelete';
import ContextMenu from '../ContextMenu';
import EditAppForm from '../EditAppForm';
import EditUserForm from '../EditUserForm';
import ForgotPassword, { asRoute as asForgotPasswordRoute } from '../ForgotPassword';
import Layouts from '../Layouts';
import Login from '../Login';
import Logout from '../Logout';
import MonitorControlsDialog, { asRoute as asMonitorControlsDialogRoute, withLauncherConfig } from '../MonitorControlsDialog';
import NewAppForm from '../NewAppForm';
import NewUserForm from '../NewUserForm';
import OrganizationSettings from '../OrganizationSettings';
import Settings from '../Settings';
import UpdatePasswordForm from '../UpdatePasswordForm';

import { ROUTES } from './consts';

export interface AppRoute {
  // tslint:disable:no-any
  Component: React.ComponentType<any>;
  exact: boolean;
  path: string;
  children?: AppRoute[];
}

export const userRoutes: AppRoute[] = [
  {
    Component: NewUserForm,
    exact: true,
    path: ROUTES.ADMIN_USERS_NEW,
  },
  {
    Component: EditUserForm,
    exact: true,
    path: ROUTES.ADMIN_USERS_EDIT,
  },
  {
    Component: ConfirmUserDelete,
    exact: true,
    path: ROUTES.ADMIN_USERS_DELETE,
  },
];

export const appRoutes: AppRoute[] = [
  {
    Component: NewAppForm,
    exact: true,
    path: ROUTES.ADMIN_APPS_NEW,
  },
  {
    Component: EditAppForm,
    exact: true,
    path: ROUTES.ADMIN_APPS_EDIT,
  },
  {
    Component: ConfirmAppDelete,
    exact: true,
    path: ROUTES.ADMIN_APPS_DELETE,
  },
];

export const adminRoutes: AppRoute[] = [
  {
    Component: OrganizationSettings,
    exact: true,
    path: ROUTES.ADMIN,
  },
  {
    Component: AdminApps,
    children: appRoutes,
    exact: false,
    path: ROUTES.ADMIN_APPS,
  },
  {
    Component: AdminUsers,
    children: userRoutes,
    exact: false,
    path: ROUTES.ADMIN_USERS,
  },
];

const settingRoutes: AppRoute[] = [
  {
    Component: UpdatePasswordForm,
    exact: true,
    path: ROUTES.SETTINGS_UPDATE_PASSWORD,
  },
  {
    Component: asMonitorControlsDialogRoute(withLauncherConfig(MonitorControlsDialog)),
    exact: true,
    path: ROUTES.SETTINGS_LAUNCHER_MONITOR,
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
    Component: Settings,
    children: settingRoutes,
    exact: false,
    path: ROUTES.SETTINGS,
  },
  {
    Component: ContextMenu,
    exact: true,
    path: ROUTES.CONTEXT_MENU,
  },
];
