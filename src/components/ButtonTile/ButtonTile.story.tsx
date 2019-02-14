import { action } from '@storybook/addon-actions';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { getNumberOrStringFromText, withMarginDecorator } from '../../utils/storybookHelpers';
import { CATEGORIES } from '../../utils/storyCategories';

import ButtonTile from './ButtonTile.css';

const handleClick = action('handleClick');

storiesOf(`${CATEGORIES.UI}ButtonTile`, module)
  .addDecorator(withMarginDecorator(30))
  .addDecorator(withKnobs)
  .add('default', () => {
    const borderRadius = text('borderRadius', '0');
    const width = text('width', '25');
    const height = text('height', '25');
    const isActive = boolean('isActive', false);
    const buttonText = text('buttonText', 'Button Text Here');

    return (
      <ButtonTile
        borderRadius={getNumberOrStringFromText(borderRadius)}
        height={getNumberOrStringFromText(height)}
        isActive={isActive}
        onClick={handleClick}
        width={getNumberOrStringFromText(width)}
      >
        {buttonText}
      </ButtonTile>
    );
  });
