import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import ConfirmPasswordUpdate from './ConfirmPasswordUpdate';

import { withMarginDecorator } from '../../utils/storybookHelpers';
import { CATEGORIES } from '../../utils/storyCategories';

storiesOf(`${CATEGORIES.COMPONENTS}ConfirmPasswordUpdate`, module)
  .addDecorator(withMarginDecorator())
  .add('default', () => {
    const handleSuccess = action('handleSuccess');

    return <ConfirmPasswordUpdate handleSuccess={handleSuccess} />;
  });
