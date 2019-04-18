import { action } from '@storybook/addon-actions';
import { number, object, withKnobs } from '@storybook/addon-knobs';
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
      const contextWindow = object(`channel ${i}`, {
        appName: `App Name ${i}`,
        identity: {
          name: `App Window ${i}`,
          uuid: `${i}`,
        },
      });

      contextWindows.push(contextWindow);
    }

    return <ContextGroupWindows contextWindows={contextWindows} handleRemove={handleRemove} handleDrop={handleDrop} />;
  });
