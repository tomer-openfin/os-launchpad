import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import Login from './Login';

storiesOf('Components/Login', module)
  .add('default', () => <Login loginError={false} onSubmit={action('Login options')} />);
