import { action } from '@storybook/addon-actions';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import WindowHeader from './WindowHeader';

const handleBack = action('handleBack');
const handleClose = action('handleClose');

storiesOf(`${CATEGORIES.UI}WindowHeader`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const title = text('title', 'OS Launchpad');
    const withBack = boolean('withBack', false);
    const withClose = boolean('withClose', false);

    return (
      <WindowHeader handleBack={withBack ? handleBack : undefined} handleClose={withClose ? handleClose : undefined}>
        {title}
      </WindowHeader>
    );
  });
