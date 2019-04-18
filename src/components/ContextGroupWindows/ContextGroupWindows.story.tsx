import { action } from '@storybook/addon-actions';
import { number, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { withMarginDecorator } from '../../utils/storybookHelpers';
import { CATEGORIES } from '../../utils/storyCategories';

import ContextGroupWindows, { Props } from './ContextGroupWindows';

const handleRemove = action('handleRemove');
const handleDrop = action('handleDrop');

storiesOf(`${CATEGORIES.COMPONENTS}ContextGroupWindows`, module)
  .addDecorator(withKnobs)
  .addDecorator(withMarginDecorator())
  .add('default', () => {
    const contextWindows: Props['contextWindows'] = [];

    const numberOfWindows = number('numberOfWindows', 3, { range: true, min: 0, max: 100, step: 1 });

    for (let i = 1; i <= numberOfWindows; i += 1) {
      const identity = {
        name: `App Window ${i}`,
        uuid: `${i}`,
      };

      contextWindows.push(identity);
    }

    return <ContextGroupWindows contextWindows={contextWindows} handleRemove={handleRemove} handleDrop={handleDrop} />;
  });
