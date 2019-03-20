import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import SupportView from './SupportView';

storiesOf(`${CATEGORIES.COMPONENTS}SupportView`, module).add('default', () => {
  const handleClose = action('handleClose');
  const handleSubmit = action('handleSubmit');

  return <SupportView handleClose={handleClose} handleSubmit={handleSubmit} />;
});
