import * as React from 'react';

import { storiesOf } from '@storybook/react';

import noop from '../../utils/noop';
import EditUserForm from './EditUserForm';

const mockData = {
  location: {
    state: {
      email: 'string',
      firstName: 'string',
      id: 'string',
      isAdmin: false,
      lastName: 'string',
      middleInitial: 'string',
      organizationId: 'string',
      phoneNumber: 'string',
      tmpPassword: 'string',
      username: 'string',
    },
  },
};

storiesOf('Components/EditUserForm', module).add('default', () => <EditUserForm updateUser={noop} location={mockData.location} />);
