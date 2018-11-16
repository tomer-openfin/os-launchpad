import ROUTES from './const';

import Admin from '../Admin';
import App from '../App';
import AppDirectory from '../AppDirectory';
import AppOverflow from '../AppOverflow';
import Layouts from '../Layouts';
import Login from '../Login';
import Settings from '../Settings';

export default [
  {
    component: Admin,
    exact: false,
    path: ROUTES.ADMIN,
  },
  {
    component: App,
    exact: true,
    path: ROUTES.HOME,
  },
  {
    component: Login,
    exact: true,
    path: ROUTES.LOGIN,
  },
  {
    component: AppDirectory,
    exact: true,
    path: ROUTES.APP_DIRECTORY,
  },
  {
    component: AppOverflow,
    exact: true,
    path: ROUTES.APP_LAUNCHER_OVERFLOW,
  },
  {
    component: Settings,
    exact: true,
    path: ROUTES.SETTINGS,
  },
  {
    component: Layouts,
    exact: true,
    path: ROUTES.LAYOUTS,
  },
];
