import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import WindowHeader from './WindowHeader';

storiesOf(`${CATEGORIES.UI}WindowHeader`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const title = text('title', 'OS Launchpad');
    const withoutClose = boolean('withoutClose', false);

    return <WindowHeader withoutClose={withoutClose}>{title}</WindowHeader>;
  });
