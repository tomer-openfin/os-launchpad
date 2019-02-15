import { storiesOf } from '@storybook/react';
import * as React from 'react';

import ConfirmPasswordUpdate from './ConfirmPasswordUpdate';

import { CATEGORIES } from '../../utils/storyCategories';

storiesOf(`${CATEGORIES.COMPONENTS}ConfirmPasswordUpdate`, module).add('default', () => {
  return <ConfirmPasswordUpdate />;
});
