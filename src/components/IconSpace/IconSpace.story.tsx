import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { CATEGORIES } from '../../utils/storyCategories';

import IconSpace from './';

storiesOf(`${CATEGORIES.COMPONENTS}IconSpace`, module).add('default', () => <IconSpace />);
