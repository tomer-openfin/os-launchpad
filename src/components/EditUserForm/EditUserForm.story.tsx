import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import UserData from '../../samples/UserData';
import { CATEGORIES } from '../../utils/storyCategories';

import EditUserForm from './EditUserForm';

const user = UserData[0];

const handleCancel = action('handleCancel');
const handleSubmitValues = action('handleSubmitValues');

storiesOf(`${CATEGORIES.ADMIN}EditUserForm`, module).add('default', () => (
  <EditUserForm initialValues={user} handleCancel={handleCancel} handleSubmitValues={handleSubmitValues} />
));
