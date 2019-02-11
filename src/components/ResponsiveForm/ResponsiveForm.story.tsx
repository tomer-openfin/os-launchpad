import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import ResponsiveForm from './ResponsiveForm';

storiesOf(`${CATEGORIES.UI}ResponsiveForm`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const isSubmitting = boolean('isSubmitting', false);

    return (
      <ResponsiveForm isSubmitting={isSubmitting} parentRoute="" submitDisabled={false}>
        <div />
      </ResponsiveForm>
    );
  });
