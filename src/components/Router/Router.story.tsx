import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Link, Switch } from 'react-router-dom';

import { renderRoute } from './Router';
import { routes } from './routes';

storiesOf('Components/Router', module).add('default', () => (
  <div>
    <Link to="/admin">Admin</Link>

    <Switch>{routes.map(renderRoute)}</Switch>
  </div>
));
