import {
  ADMIN_ROUTE,
  APP_DIRECTORY_ROUTE,
  APP_LAUNCHER_OVERFLOW_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  NEW_USER_ROUTE,
  SETTINGS_ROUTE,
  USER_DIRECTORY_ROUTE,
} from './const';

import Admin from '../Admin';
import App from '../App';
import AppDirectory from '../AppDirectory';
import AppOverflow from '../AppOverflow';
import Login from '../Login';
import NewUserForm from '../NewUserForm/NewUserForm';
import Settings from '../Settings';
import UserDirectory from '../UserDirectory/UserDirectory';

export default [
  {
    component: Admin,
    exact: true,
    path: ADMIN_ROUTE,
  },
  {
    component: App,
    exact: true,
    path: HOME_ROUTE,
  },
  {
    component: Login,
    exact: true,
    path: LOGIN_ROUTE,
  },
  {
    component: AppDirectory,
    exact: true,
    path: APP_DIRECTORY_ROUTE,
  },
  {
    component: AppOverflow,
    exact: true,
    path: APP_LAUNCHER_OVERFLOW_ROUTE,
  },
  {
    component: Settings,
    exact: true,
    path: SETTINGS_ROUTE,
  },
  {
    component: UserDirectory,
    exact: true,
    path: USER_DIRECTORY_ROUTE,
  },
  {
    component: NewUserForm,
    exact: true,
    path: NEW_USER_ROUTE,
  },
];
