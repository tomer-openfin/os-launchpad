import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import UserData from '../../samples/UserData';
import { CATEGORIES } from '../../utils/storyCategories';

import EditUserForm from './EditUserForm';

const mockLocation = {
  hash: '',
  pathname: '',
  search: '',
  state: UserData[0],
};

const updateUser = action('updateUser');
const onEscDown = action('onEscDown');

storiesOf(`${CATEGORIES.ADMIN}EditUserForm`, module).add('default', () => (
  <EditUserForm location={mockLocation} onEscDown={onEscDown} updateUser={updateUser} />
));
