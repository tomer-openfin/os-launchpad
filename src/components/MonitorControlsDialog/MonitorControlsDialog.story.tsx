import { action } from '@storybook/addon-actions';
import { number, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { withMarginDecorator } from '../../utils/storybookHelpers';
import { CATEGORIES } from '../../utils/storyCategories';

import MonitorControlsDialog from './MonitorControlsDialog';

const handleClick = action('handleClick');

storiesOf(`${CATEGORIES.COMPONENTS}MonitorControlsDialog`, module)
  .addDecorator(withKnobs)
  .addDecorator(withMarginDecorator())
  .add('default', () => {
    const title = text('title', 'MonitorControlsDialog');
    const height = number('height', 240);
    const width = number('width', 380);
    const gutterSize = number('gutterSize', 7);
    const activeId = text('activeId', '');

    return <MonitorControlsDialog activeId={activeId} gutterSize={gutterSize} handleClick={handleClick} height={height} title={title} width={width} />;
  });
