import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import routes, { AppRoute } from './routes';

import { GlobalStyle } from '../../styles/globals.css';

const renderNestedRoute = (Component, children) => props => {
  return <Component {...props}>{children.map(renderRoute)}</Component>;
};

export const renderRoute = ({ children, Component, exact, path }: AppRoute) => {
  if (!children) {
    return <Route key={path} component={Component} exact={exact} path={path} />;
  }

  return <Route key={path} exact={exact} path={path} render={renderNestedRoute(Component, children)} />;
};

const Router = () => (
  <>
    <GlobalStyle />

    <BrowserRouter>
      <Switch>{routes.map(renderRoute)}</Switch>
    </BrowserRouter>
  </>
);

export default Router;
