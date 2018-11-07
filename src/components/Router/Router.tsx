import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import routes from './routes';

import { GlobalStyle } from '../../styles/globals.css';

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
      <GlobalStyle />

      {routes.map(renderRoute)}
    </div>
  </BrowserRouter>
);

export default Router;
