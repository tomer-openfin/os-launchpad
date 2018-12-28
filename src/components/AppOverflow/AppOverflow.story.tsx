import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import AppOverflow from './AppOverflow';

storiesOf(`${CATEGORIES.COMPONENTS}AppOverflow`, module).add('default', () => <AppOverflow />);
