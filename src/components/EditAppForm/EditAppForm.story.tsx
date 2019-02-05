import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import AppData from '../../samples/AppData';
import { CATEGORIES } from '../../utils/storyCategories';

import EditAppForm from './EditAppForm';

const app = AppData[0];

const updateApp = action('updateApp');
const onEscDown = action('onEscDown');
const pushRoute = action('pushRoute');

storiesOf(`${CATEGORIES.ADMIN}EditAppForm`, module).add('default', () => (
  <EditAppForm app={app} pushRoute={pushRoute} onEscDown={onEscDown} updateApp={updateApp} />
));
