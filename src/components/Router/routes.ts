import * as React from 'react';

import Admin from '../Admin';
import App from '../App';
import AppDirectory from '../AppDirectory';
import AppOverflow from '../AppOverflow';
import ConfirmUserDelete from '../ConfirmUserDelete';
import EditUserForm from '../EditUserForm';
import Layouts from '../Layouts';
import Login from '../Login';
import NewUserForm from '../NewUserForm';
import Settings from '../Settings';
import UserDirectory from '../UserDirectory';

import ROUTES from './const';

export interface AppRoute {
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

const routes: AppRoute[] = [
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
        Component: AppDirectory,
        exact: false,
        path: ROUTES.ADMIN_APPS,
      },
      {
        Component: Settings,
        exact: false,
        path: ROUTES.ADMIN_SETTINGS,
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
];

export default routes;
