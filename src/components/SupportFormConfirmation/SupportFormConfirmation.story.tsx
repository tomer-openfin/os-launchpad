import { action } from '@storybook/addon-actions';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import SupportFormConfirmation from './SupportFormConfirmation';

storiesOf(`${CATEGORIES.COMPONENTS}SupportFormConfirmation`, module)
  .addDecorator(withKnobs)
  .add('default bug success', () => {
    const handleClose = action('handleClose');
    const isSuccess = boolean('isSuccess', true);

    return <SupportFormConfirmation isSuccess={isSuccess} handleClose={handleClose} />;
  });
