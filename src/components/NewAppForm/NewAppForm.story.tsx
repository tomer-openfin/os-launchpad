import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import NewAppForm from './NewAppForm';

const handleCancel = action('handleCancel');
const handleSubmitValues = action('handleSubmitValues');

const emptyApp = {
  appUrl: '',
  contexts: [],
  description: '',
  icon: '',
  id: '',
  images: [],
  intents: [],
  manifest_url: '',
  name: '',
  title: '',
  withAppUrl: true,
};

storiesOf(`${CATEGORIES.ADMIN}NewAppForm`, module).add('default', () => (
  <NewAppForm initialValues={emptyApp} handleCancel={handleCancel} handleSubmitValues={handleSubmitValues} />
));
