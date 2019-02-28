import { action } from '@storybook/addon-actions';
import { color, number, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { withMarginDecorator } from '../../utils/storybookHelpers';
import { CATEGORIES } from '../../utils/storyCategories';

import Button, { defaultProps } from './Button.css';

storiesOf(`${CATEGORIES.UI}Button`, module)
  .addDecorator(withKnobs)
  .addDecorator(withMarginDecorator())
  .add('default', () => <Button onClick={action('Button Click')}>Button Text</Button>)
  .add('with knobs', () => {
    const buttonText = text('Button Text', 'Place Text Here');
    const backgroundColor = color('backgroundColor', defaultProps.backgroundColor);
    const height = number('height', defaultProps.height);
    const width = number('width', defaultProps.width);

    return (
      <Button backgroundColor={backgroundColor} height={height} onClick={action('Button Click')} width={width}>
        {buttonText}
      </Button>
    );
  });
