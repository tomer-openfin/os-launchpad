import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import Settings from './Settings';

storiesOf(`${CATEGORIES.COMPONENTS}Settings`, module).add('default', () => <Settings />);
