import * as React from 'react';

import { storiesOf } from '@storybook/react';

import ConfirmUserDelete from './';

import noop from '../../utils/noop';

// mock .location.state structure from using react-router
const currentUserData = {
  location: {
    state: {
      firstName: 'John',
      id: '1',
      lastName: 'Doe',
    },
  },
};

storiesOf('ConfirmUserDelete', module).add('default', () => <ConfirmUserDelete deleteUser={noop} location={currentUserData.location} />);
