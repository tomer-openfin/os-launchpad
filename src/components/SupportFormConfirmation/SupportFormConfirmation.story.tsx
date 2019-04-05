import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import SupportFormConfirmation from './SupportFormConfirmation';
import { BugSuccess } from './SupportFormCopy';

storiesOf(`${CATEGORIES.COMPONENTS}SupportFormConfirmation`, module)
  .addDecorator(withKnobs)
  .add('default bug success', () => {
    const handleClose = action('handleClose');

    return (
      <SupportFormConfirmation handleClose={handleClose}>
        <BugSuccess />
      </SupportFormConfirmation>
    );
  });
