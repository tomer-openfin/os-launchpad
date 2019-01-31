import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import AppData from '../../samples/AppData';
import { CATEGORIES } from '../../utils/storyCategories';

import EditAppForm from './EditAppForm';

const mockLocation = {
  hash: 'for react-router',
  pathname: 'for react-router',
  search: 'for react-router',
  state: AppData[0],
};

const updateApp = action('updateApp');
const onEscDown = action('onEscDown');

storiesOf(`${CATEGORIES.ADMIN}EditAppForm`, module).add('default', () => <EditAppForm location={mockLocation} onEscDown={onEscDown} updateApp={updateApp} />);
