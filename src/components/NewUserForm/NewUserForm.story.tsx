import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import UserData from '../../samples/UserData';
import { CATEGORIES } from '../../utils/storyCategories';

import NewUserForm from './NewUserForm';

const mockData = {
  location: {
    state: UserData[0],
  },
};

const createUser = action('createUser');

storiesOf(`${CATEGORIES.ADMIN}NewUserForm`, module).add('default', () => <NewUserForm location={mockData.location} createUser={createUser} />);
