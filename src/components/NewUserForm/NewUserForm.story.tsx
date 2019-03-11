import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import NewUserForm from './NewUserForm';

const createUser = action('createUser');
const handleCancel = action('handleCancel');
const handleSuccess = action('handleSuccess');
const onEscDown = action('onEscDown');

storiesOf(`${CATEGORIES.ADMIN}NewUserForm`, module).add('default', () => (
  <NewUserForm createUser={createUser} handleCancel={handleCancel} handleSuccess={handleSuccess} onEscDown={onEscDown} />
));
