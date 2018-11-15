import * as React from 'react';

import { storiesOf } from '@storybook/react';

import EditUserForm from './';

import noop from '../../utils/noop';

const mockData = {
  email: 'testEmail@gmail.com',
  firstName: 'testFirstName',
  isAdmin: true,
  lastName: 'testLastName',
  middleInitial: 'testMI',
  username: 'testUsername',
};

storiesOf('Components/EditUserForm', module).add('default', () => <EditUserForm currentUserData={mockData} updateUser={noop} />);
