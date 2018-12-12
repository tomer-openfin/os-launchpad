import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { AppRoute, routes } from './routes';

import { GlobalStyle } from '../../styles/globals.css';
import ConnectedThemeProvider from '../ConnectedThemeProvider';
import FinHideShowTracker from '../FinHideShowTracker';

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
  <ConnectedThemeProvider>
    <FinHideShowTracker>
      <GlobalStyle />

      <BrowserRouter>
        <Switch>{routes.map(renderRoute)}</Switch>
      </BrowserRouter>
    </FinHideShowTracker>
  </ConnectedThemeProvider>
);

export default Router;
