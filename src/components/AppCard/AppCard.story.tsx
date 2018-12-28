import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import AppData from '../../samples/AppData';
import { CATEGORIES } from '../../utils/storyCategories';

import AppCard from './AppCard';

const launchApp = action('Launch app');

storiesOf(`${CATEGORIES.COMPONENTS}AppCard`, module).add('default', () => <AppCard app={AppData[0]} launchApp={launchApp} />);
