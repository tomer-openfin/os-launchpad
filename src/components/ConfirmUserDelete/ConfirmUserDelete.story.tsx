import * as React from 'react';

import { storiesOf } from '@storybook/react';

import ConfirmUserDelete from './';

import noop from '../../utils/noop';

// mock .location.state structure from using react-router
const currentUserData = {
  location: {
    state: {
      id: '1',
      username: 'jon',
    },
  },
};

storiesOf('ConfirmUserDelete', module).add('default', () => <ConfirmUserDelete deleteUser={noop} location={currentUserData.location} />);
