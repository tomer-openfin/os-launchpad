import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import Login from './Login';

storiesOf('Login', module)
  .add('default', () => <Login onSubmit={action('Login options')}/>);
