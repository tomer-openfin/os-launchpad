import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import UserData from '../../samples/UserData';
import { CATEGORIES } from '../../utils/storyCategories';

import ConfirmUserDelete from './ConfirmUserDelete';

const deleteUser = action('deleteUser');
const handleCancel = action('handleCancel');
const handleSuccess = action('handleSuccess');

storiesOf(`${CATEGORIES.ADMIN}ConfirmUserDelete`, module).add('default', () => (
  <ConfirmUserDelete deleteUser={deleteUser} handleCancel={handleCancel} handleSuccess={handleSuccess} user={UserData[0]} />
));
