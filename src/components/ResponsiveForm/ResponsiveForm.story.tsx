import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import ResponsiveForm from './ResponsiveForm';

storiesOf(`${CATEGORIES.UI}ResponsiveForm`, module).add('default', () => (
  <ResponsiveForm parentRoute="" submitDisabled={false}>
    <div />
  </ResponsiveForm>
));
