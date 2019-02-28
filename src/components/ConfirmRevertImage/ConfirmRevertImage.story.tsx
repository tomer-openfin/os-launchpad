import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import ConfirmRevertImage from './ConfirmRevertImage';

const revertImage = action('revertImage');
const pushRoute = action('pushRoute');

storiesOf(`${CATEGORIES.ADMIN}ConfirmRevertImage`, module).add('default', () => (
  <ConfirmRevertImage imageKey="logo" revertImage={revertImage} pushRoute={pushRoute} />
));
