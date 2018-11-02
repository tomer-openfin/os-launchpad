const HOME_ROUTE = '/';
export const LOGIN_ROUTE = '/login';

import App from '../App';
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
];
