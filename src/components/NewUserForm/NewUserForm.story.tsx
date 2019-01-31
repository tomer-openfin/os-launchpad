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
const onEscDown = action('onEscDown');

storiesOf(`${CATEGORIES.ADMIN}NewUserForm`, module).add('default', () => (
  <NewUserForm createUser={createUser} location={mockData.location} onEscDown={onEscDown} />
));
