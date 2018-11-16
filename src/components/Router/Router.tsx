import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

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
  <>
    <GlobalStyle />
    <BrowserRouter>
      <Switch>
        {routes.map(renderRoute)}
      </Switch>
    </BrowserRouter>
  </>
);

export default Router;
