import { action } from '@storybook/addon-actions';
import { number, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { DirectionalPosition } from '../../types/enums';
import { withMarginDecorator } from '../../utils/storybookHelpers';
import { CATEGORIES } from '../../utils/storyCategories';

import DirectionControls, { defaultProps } from './DirectionControls';

const handleChange = action('handleChange');

storiesOf(`${CATEGORIES.COMPONENTS}DirectionControls`, module)
  .addDecorator(withKnobs)
  .addDecorator(withMarginDecorator(30))
  .add('default', () => {
    const direction = select('direction', Object(DirectionalPosition), DirectionalPosition.Bottom);
    const size = number('size', defaultProps.size);

    return <DirectionControls direction={direction} handleChange={handleChange} size={size} />;
  });
