import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import noop from '../../utils/noop';
import Login from './Login';

const loginState = {
  changePassword: false,
  error: false,
  message: '',
  session: '',
};

storiesOf(`${CATEGORIES.COMPONENTS}Login`, module)
  .add('default', () => (
    <Login
      autoLoginOrg={true}
      closeApplication={noop}
      loginState={loginState}
      login={action('Login options')}
      loginWithNewPassword={action('Login with new password options')}
    />
  ))
  .add('Change Password', () => (
    <Login
      autoLoginOrg={true}
      closeApplication={noop}
      loginState={{ ...loginState, changePassword: true, message: 'Please create a new password' }}
      login={action('Login options')}
      loginWithNewPassword={action('Login with new password options')}
    />
  ))
  .add('With Error', () => (
    <Login
      autoLoginOrg={true}
      closeApplication={noop}
      loginState={{ ...loginState, error: true, message: 'Invalid username or password' }}
      login={action('Login options')}
      loginWithNewPassword={action('Login with new password options')}
    />
  ));
