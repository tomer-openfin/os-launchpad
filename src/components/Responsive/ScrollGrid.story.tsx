import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import ScrollGrid from './ScrollGrid';

storiesOf(`${CATEGORIES.UI}ScrollGrid`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return (
      <ScrollGrid>
        <div />
      </ScrollGrid>
    );
  });
