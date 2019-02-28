import { action } from '@storybook/addon-actions';
import { number, object, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { withMarginDecorator } from '../../utils/storybookHelpers';
import { CATEGORIES } from '../../utils/storyCategories';

import MonitorControls, { MonitorScreen } from './MonitorControls';
import MonitorControlsContainer from './MonitorControlsContainer';

const handleClick = action('handleClick');

storiesOf(`${CATEGORIES.COMPONENTS}MonitorControls`, module)
  .addDecorator(withKnobs)
  .addDecorator(withMarginDecorator())
  .add('default', () => {
    const activeId = text('activeId', '');
    const height = number('height', 240);
    const width = number('width', 380);
    const numberOfMonitors = number('numberOfMonitors', 2, { range: true, min: 1, max: 100, step: 1 });

    const monitorScreens: MonitorScreen[] = [];
    for (let i = 1; i <= numberOfMonitors; i += 1) {
      const monitorScreen = object(`monitor ${i}`, {
        id: `${i}`,
        rect: {
          bottom: 20 * i,
          left: 10 * i,
          right: 20 * i,
          top: 10 * i,
        },
      });

      monitorScreens.push(monitorScreen);
    }

    return <MonitorControls activeId={activeId} height={height} handleClick={handleClick} monitorScreens={monitorScreens} width={width} />;
  })
  .add('with container', () => {
    const activeId = text('activeId', '');
    const height = number('height', 240);
    const width = number('width', 380);
    const gutterSize = number('gutterSize', 7);

    return <MonitorControlsContainer activeId={activeId} gutterSize={gutterSize} height={height} handleClick={handleClick} width={width} />;
  });
