import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import routes from './routes';

const renderRoute = ({ component, exact, path }) => (
  <Route
    key={path}
    component={component}
    exact={exact}
    path={path}
  />
);

const Router = () => (
  <BrowserRouter>
    <div>
      {routes.map(renderRoute)}
    </div>
  </BrowserRouter>
);

export default Router;
