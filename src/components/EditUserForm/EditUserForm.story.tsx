import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import UserData from '../../samples/UserData';
import { CATEGORIES } from '../../utils/storyCategories';

import EditUserForm from './EditUserForm';

const mockData = {
  location: {
    hash: '',
    pathname: '',
    search: '',
    state: UserData[0],
  },
};

const updateUser = action('updateUser');

storiesOf(`${CATEGORIES.ADMIN}EditUserForm`, module).add('default', () => (
  <EditUserForm match={{ params: '', isExact: true, path: '', url: '' }} history={{}} updateUser={updateUser} location={mockData.location} />
));
