import * as React from 'react';

import { action } from '@storybook/addon-actions';
import { number, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { Color } from '../../styles';
import { CATEGORIES } from '../../utils/storyCategories';

import Button from './Button.css';

storiesOf(`${CATEGORIES.UI}Button`, module)
  .addDecorator(withKnobs)
  .add('default', () => <Button onClick={action('Button Click')}>Button Text</Button>)
  .add('with knobs', () => {
    const buttonText = text('Button Text', 'Place Text Here');
    const backgroundColor = text('backgroundColor', Color.VENUS);
    const width = number('Width', 150);

    return (
      <Button backgroundColor={backgroundColor} onClick={action('Button Click')} width={width}>
        {buttonText}
      </Button>
    );
  })
  .add('with theme', () => {
    const buttonText = text('Button Text', 'Theme Me');
    const label = 'Theme';
    const options = {
      Dark: 'DARK',
      Light: 'LIGHT',
    };
    const defaultValue = 'LIGHT';
    const value = select(label, options, defaultValue);

    return (
      <Button isDark={value === 'Dark'} onClick={action('Button Click')}>
        {buttonText}
      </Button>
    );
  });
