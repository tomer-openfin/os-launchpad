import { APP_DIRECTORY_ROUTE, APP_LAUNCHER_OVERFLOW_ROUTE, HOME_ROUTE, LOGIN_ROUTE } from './const';

import App from '../App';
import AppDirectory from '../AppDirectory';
import AppOverflow from '../AppOverflow';
import Login from '../Login';

export default [
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
];
