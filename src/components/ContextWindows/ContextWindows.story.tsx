import { action } from '@storybook/addon-actions';
import { number, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import ContextWindows, { ContextWindowsGroup } from './ContextWindows';

const handleAdd = action('handleAdd');
const handleDrop = action('handleDrop');
const handleSnapshot = action('handleSnapshot');

storiesOf(`${CATEGORIES.COMPONENTS}ContextWindows`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const numberOfWindows = number('numberOfWindows', 3, { range: true, min: 0, max: 100, step: 1 });

    const contextWindowsByGroup: ContextWindowsGroup[] = [];
    const redGroup: ContextWindowsGroup = {
      channel: {
        color: 'red',
        id: 'red',
        isGlobal: false,
        name: 'Red',
      },
      contextWindows: [],
    };
    for (let i = 1; i <= numberOfWindows; i += 1) {
      const identity = {
        name: `App Window ${i}`,
        uuid: `${i}`,
      };

      redGroup.contextWindows.push(identity);
    }
    contextWindowsByGroup.push(redGroup);

    return (
      <ContextWindows
        contextWindowsByGroup={contextWindowsByGroup}
        handleAdd={handleAdd}
        handleDrop={handleDrop}
        handleSnapshot={handleSnapshot}
        snapshotIdentity={null}
      />
    );
  });
