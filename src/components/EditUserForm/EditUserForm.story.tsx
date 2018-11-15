import * as React from 'react';

import { storiesOf } from '@storybook/react';

import EditUserForm from './';

// pass statusCode of '400' to simulate failure response
const updateUser = (payload, statusCode = '200') =>
  fetch(`${process.env.MOCK_POSTMAN_URI}/admin/users`, {
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'x-api-key': `${process.env.POSTMAN_API_KEY}`,
      'x-mock-response-code': `${statusCode}`, // postman specific
    },
    method: 'PUT',
  }).then(response => response.json());

const mockUserData = {
  email: 'testEmail@gmail.com',
  firstName: 'testFirstName',
  isAdmin: true,
  lastName: 'testLastName',
  middleInitial: 'testMI',
  username: 'testUsername',
};

// tslint:disable-next-line:max-line-length
storiesOf('Components/EditUserForm', module).add('default', () => <EditUserForm currentUserData={mockUserData} updateUser={updateUser} />);
