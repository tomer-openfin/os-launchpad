import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { withMarginDecorator } from '../../utils/storybookHelpers';
import { CATEGORIES } from '../../utils/storyCategories';

import ForgotPasswordSuccess from './ForgotPasswordSuccess';

const handleClick = action('handleClick');

storiesOf(`${CATEGORIES.COMPONENTS}ForgotPasswordSuccess`, module)
  .addDecorator(withMarginDecorator(30))
  .add('default', () => {
    return <ForgotPasswordSuccess handleClick={handleClick} />;
  });
