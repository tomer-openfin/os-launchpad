import * as React from 'react';

import { storiesOf } from '@storybook/react';

import NewUserForm from './';

// pass statusCode of '400' to simulate failure response
const createUser = (payload, statusCode = '200') =>
  fetch(`${process.env.MOCK_POSTMAN_URI}/admin/users`, {
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'x-api-key': `${process.env.POSTMAN_API_KEY}`,
      'x-mock-response-code': `${statusCode}`, // postman specific
    },
    method: 'POST',
  }).then(response => response.json());

storiesOf('Components/NewUserForm', module)
  .add('default', () => <NewUserForm createUser={createUser} />);
