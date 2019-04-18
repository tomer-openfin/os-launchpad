import { action } from '@storybook/addon-actions';
import { boolean, color, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import WindowHeader, { defaultProps } from './WindowHeader';

const handleBack = action('handleBack');
const handleClose = action('handleClose');

storiesOf(`${CATEGORIES.UI}WindowHeader`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const title = text('title', 'OS Launchpad');
    const backgroundColor = color('backgroundColor', defaultProps.backgroundColor);
    const withBack = boolean('withBack', false);
    const withClose = boolean('withClose', false);

    return (
      <WindowHeader
        backgroundColor={backgroundColor}
        handleBack={withBack ? handleBack : undefined}
        handleClose={withClose ? handleClose : undefined}
        label={title}
      >
        {title}
      </WindowHeader>
    );
  });
