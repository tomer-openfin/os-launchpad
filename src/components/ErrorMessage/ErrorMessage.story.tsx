import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { CATEGORIES } from '../../utils/storyCategories';

import ErrorMessage from './ErrorMessage.css';

storiesOf(`${CATEGORIES.UI}ErrorMessage`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const message = text('message', 'Error');

    return <ErrorMessage>{message}</ErrorMessage>;
  });
