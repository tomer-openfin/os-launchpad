import * as React from 'react';

import { storiesOf } from '@storybook/react';

import noop from '../../utils/noop';
import EditUserForm from './EditUserForm';

const mockData = {
  location: {
    hash: '',
    pathname: '',
    search: '',
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

storiesOf('Components/EditUserForm', module).add('default', () => (
  <EditUserForm match={{ params: '', isExact: true, path: '', url: '' }} history={{}} updateUser={noop} location={mockData.location} />
));
