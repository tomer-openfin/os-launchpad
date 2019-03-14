import { action } from '@storybook/addon-actions';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import FormFooter from './FormFooter';

const handleCancel = action('handleCancel');

storiesOf(`${CATEGORIES.UI}FormFooter`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const isSubmitting = boolean('isSubmitting', false);

    return <FormFooter isSubmitting={isSubmitting} handleCancel={handleCancel} submitDisabled={false} />;
  });
