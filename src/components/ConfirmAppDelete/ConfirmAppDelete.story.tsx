import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import AppData from '../../samples/AppData';
import ConfirmAppDelete from './ConfirmAppDelete';

const deleteApp = action('deleteApp');
const handleCancel = action('handleCancel');
const handleSuccess = action('handleSuccess');

storiesOf(`${CATEGORIES.ADMIN}ConfirmAppDelete`, module).add('default', () => (
  <ConfirmAppDelete app={AppData[0]} deleteApp={deleteApp} id="1" handleCancel={handleCancel} handleSuccess={handleSuccess} />
));
