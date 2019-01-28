import { storiesOf } from '@storybook/react';
import * as React from 'react';

import appData from '../../samples/AppData';
import { CATEGORIES } from '../../utils/storyCategories';

import AdminApps from './AdminApps';

storiesOf(`${CATEGORIES.ADMIN}AdminApps`, module).add('default', () => <AdminApps apps={appData} />);
