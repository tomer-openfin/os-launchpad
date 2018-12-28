import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import NewAppForm from './NewAppForm';

const createApp = action('createApp');

storiesOf(`${CATEGORIES.ADMIN}NewAppForm`, module).add('default', () => <NewAppForm createApp={createApp} />);
