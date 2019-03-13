import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import { User } from '../../types/commons';
import NewUserForm from './NewUserForm';

const handleCancel = action('handleCancel');
const handleSubmitValues = action('handleSubmitValues');

const emptyUser: User = {
  email: '',
  firstName: '',
  id: '',
  lastName: '',
  middleInitial: '',
  phone: '',
  tmpPassword: '',
  username: '',
};

storiesOf(`${CATEGORIES.ADMIN}NewUserForm`, module).add('default', () => (
  <NewUserForm initialValues={emptyUser} handleCancel={handleCancel} handleSubmitValues={handleSubmitValues} />
));
