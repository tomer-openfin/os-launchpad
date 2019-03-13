import { action } from '@storybook/addon-actions';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import ScrollGrid from './ScrollGrid';

storiesOf(`${CATEGORIES.UI}ScrollGrid`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const handleCancel = action('handleCancel');
    const isSubmitting = boolean('isSubmitting', false);

    return (
      <ScrollGrid>
        <div />
      </ScrollGrid>
    );
  });
