import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import AppData from '../../samples/AppData';
import { CATEGORIES } from '../../utils/storyCategories';

import EditAppForm from './EditAppForm';

const app = AppData[0];

const handleCancel = action('handleCancel');
const handleSubmitValues = action('handleSubmitValues');

storiesOf(`${CATEGORIES.ADMIN}EditAppForm`, module).add('default', () => (
  <EditAppForm initialValues={app} handleCancel={handleCancel} handleSubmitValues={handleSubmitValues} />
));
