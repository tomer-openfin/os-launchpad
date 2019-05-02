import * as React from 'react';

import { ROUTES } from './consts';

import Admin from '../Admin';
import AdminApps, { asRoute as asAdminAppsRoute } from '../AdminApps';
import AdminOrgImageUpload from '../AdminOrgImageUpload';
import AdminUsers, { asRoute as asAdminUsersRoute } from '../AdminUsers';
import App from '../App';
import AppDirectory from '../AppDirectory';
import AppOverflow from '../AppOverflow';
import ComponentPreviewWindow from '../ComponentPreviewWindow';
import ConfirmRevertImage from '../ConfirmRevertImage';
import ContextManager from '../ContextManager';
import ContextMenu from '../ContextMenu';
import ContextSubscriber from '../ContextSubscriber';
import ForgotPassword, { asRoute as asForgotPasswordRoute } from '../ForgotPassword';
import LauncherMenu, { withLogout, withSettings } from '../LauncherMenu';
import Layouts from '../Layouts';
import Login from '../Login';
import OrganizationSettings from '../OrganizationSettings';
import Settings, { asRoute as asSettingsRoutes } from '../Settings';
import Snapshot from '../Snapshot';
import SnapshotOverlay from '../SnapshotOverlay';
import Support from '../Support';

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
    Component: ContextSubscriber,
    exact: true,
    path: ROUTES.CHANNELS_CONTEXT,
  },
  {
    Component: ContextManager,
    exact: true,
    path: ROUTES.CHANNELS,
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
    Component: withLogout(LauncherMenu),
    exact: true,
    path: ROUTES.LOGOUT,
  },
  {
    Component: withSettings(LauncherMenu),
    exact: true,
    path: ROUTES.SETTINGS_MENU,
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
    Component: Support,
    exact: true,
    path: ROUTES.SUPPORT,
  },
  {
    Component: Snapshot,
    exact: true,
    path: ROUTES.SNAPSHOT,
  },
  {
    Component: SnapshotOverlay,
    exact: true,
    path: ROUTES.SNAPSHOT_OVERLAY,
  },
  {
    Component: ContextMenu,
    exact: true,
    path: ROUTES.CONTEXT_MENU,
  },
  {
    Component: ComponentPreviewWindow,
    exact: true,
    path: ROUTES.PREVIEW,
  },
];
