import * as React from 'react';

import { storiesOf } from '@storybook/react';

import noop from '../../utils/noop';
import ConfirmUserDelete from './ConfirmUserDelete';

// mock .location.state structure from using react-router
const currentUserData = {
  location: {
    state: {
      email: 'string',
      firstName: 'string',
      id: 'string',
      isAdmin: false,
      lastName: 'string',
      middleInitial: 'string',
      organizationId: 'string',
      phone: 'string',
      tmpPassword: 'string',
      username: 'string',
    },
  },
};

storiesOf('ConfirmUserDelete', module).add('default', () => <ConfirmUserDelete deleteUser={noop} location={currentUserData.location} />);
