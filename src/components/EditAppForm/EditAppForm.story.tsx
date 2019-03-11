import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import AppData from '../../samples/AppData';
import { CATEGORIES } from '../../utils/storyCategories';

import EditAppForm from './EditAppForm';

const handleCancel = action('handleCancel');
const handleDelete = action('handleDelete');
const handleSuccess = action('handleSuccess');
const onEscDown = action('onEscDown');
const updateApp = action('updateApp');

storiesOf(`${CATEGORIES.ADMIN}EditAppForm`, module).add('default', () => (
  <EditAppForm
    app={AppData[0]}
    appId="2"
    handleCancel={handleCancel}
    handleDelete={handleDelete}
    handleSuccess={handleSuccess}
    onEscDown={onEscDown}
    updateApp={updateApp}
  />
));
