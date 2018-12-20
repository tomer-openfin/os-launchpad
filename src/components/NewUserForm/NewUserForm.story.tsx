import * as React from 'react';

import { storiesOf } from '@storybook/react';

import noop from '../../utils/noop';
import NewUserForm from './NewUserForm';

const mockData = {
  location: {
    state: {
      email: 'name@giantfin.co',
      firstName: 'Dusya',
      id: 'string',
      isAdmin: false,
      lastName: 'Sigachyova',
      middleInitial: 'L',
      organizationId: 'string',
      phone: '',
      tmpPassword: 'string',
      username: 'string',
    },
  },
};

storiesOf('Components/NewUserForm', module).add('default', () => <NewUserForm location={mockData.location} createUser={noop} />);
