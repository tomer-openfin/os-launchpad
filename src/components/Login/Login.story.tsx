import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import Login from './Login';

const loginState = {
  changePassword: false,
  error: false,
  message: '',
  session: '',
};

storiesOf('Components/Login', module)
  .add('default', () => (
    <Login
      loginState={loginState}
      login={action('Login options')}
      loginWithNewPassword={action('Login with new password options')}
    />),
  )
  .add('Change Password', () => (
    <Login
      loginState={{ ...loginState, changePassword: true, message: 'Please create a new password' }}
      login={action('Login options')}
      loginWithNewPassword={action('Login with new password options')}
    />),
  )
  .add('With Error', () => (
    <Login
      loginState={{ ...loginState, error: true, message: 'Invalid username or password' }}
      login={action('Login options')}
      loginWithNewPassword={action('Login with new password options')}
    />),
  );
