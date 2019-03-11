import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import UserData from '../../samples/UserData';
import { CATEGORIES } from '../../utils/storyCategories';

import EditUserForm from './EditUserForm';

const user = UserData[0];

const handleCancel = action('handleCancel');
const handleDelete = action('handleDelete');
const handleSuccess = action('handleSuccess');
const onEscDown = action('onEscDown');
const updateUser = action('updateUser');

storiesOf(`${CATEGORIES.ADMIN}EditUserForm`, module).add('default', () => (
  <EditUserForm
    handleCancel={handleCancel}
    handleDelete={handleDelete}
    handleSuccess={handleSuccess}
    id={user.id}
    onEscDown={onEscDown}
    updateUser={updateUser}
    user={user}
  />
));
