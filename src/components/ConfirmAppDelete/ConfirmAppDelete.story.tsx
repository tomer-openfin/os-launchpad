import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import AppData from '../../samples/AppData';
import { CATEGORIES } from '../../utils/storyCategories';

import ConfirmAppDelete from './ConfirmAppDelete';

const deleteApp = action('deleteApp');
const pushRoute = action('pushRoute');
const app = AppData[0];

storiesOf(`${CATEGORIES.ADMIN}ConfirmAppDelete`, module).add('default', () => <ConfirmAppDelete app={app} deleteApp={deleteApp} pushRoute={pushRoute} />);
