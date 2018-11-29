import * as React from 'react';

import Admin from '../Admin';
import AdminApps from '../AdminApps';
import App from '../App';
import AppDirectory from '../AppDirectory';
import AppOverflow from '../AppOverflow';
import ConfirmAppDelete from '../ConfirmAppDelete';
import ConfirmUserDelete from '../ConfirmUserDelete';
import ContextMenu from '../ContextMenu';
import EditAppForm from '../EditAppForm';
import EditUserForm from '../EditUserForm';
import Layouts from '../Layouts';
import Login from '../Login';
import NewAppForm from '../NewAppForm';
import NewUserForm from '../NewUserForm';
import OrganizationSettings from '../OrganizationSettings';
import Settings from '../Settings';
import UserDirectory from '../UserDirectory';

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
    exact: false,
    path: ROUTES.ADMIN_USERS_NEW,
  },
  {
    Component: EditUserForm,
    exact: false,
    path: ROUTES.ADMIN_USERS_EDIT,
  },
  {
    Component: ConfirmUserDelete,
    exact: false,
    path: ROUTES.ADMIN_USERS_DELETE,
  },
];

export const appRoutes: AppRoute[] = [
  {
    Component: NewAppForm,
    exact: false,
    path: ROUTES.ADMIN_APPS_NEW,
  },
  {
    Component: EditAppForm,
    exact: false,
    path: ROUTES.ADMIN_APPS_EDIT,
  },
  {
    Component: ConfirmAppDelete,
    exact: false,
    path: ROUTES.ADMIN_APPS_DELETE,
  },
];

export const routes: AppRoute[] = [
  {
    Component: Admin,
    children: [
      {
        Component: UserDirectory,
        children: userRoutes,
        exact: false,
        path: ROUTES.ADMIN_USERS,
      },
      {
        Component: AdminApps,
        children: appRoutes,
        exact: false,
        path: ROUTES.ADMIN_APPS,
      },
      {
        Component: OrganizationSettings,
        exact: false,
        path: ROUTES.ADMIN,
      },
    ],
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
    Component: AppDirectory,
    exact: true,
    path: ROUTES.APP_DIRECTORY,
  },
  {
    Component: Settings,
    exact: true,
    path: ROUTES.SETTINGS,
  },
  {
    Component: ContextMenu,
    exact: true,
    path: ROUTES.CONTEXT_MENU,
  },
];
