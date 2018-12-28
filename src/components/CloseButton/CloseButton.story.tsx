import { action } from '@storybook/addon-actions';
import { boolean, number, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import CloseButton from './CloseButton';

const handleClick = action('CloseButton clicked');

storiesOf(`${CATEGORIES.UI}CloseButton`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const disabled = boolean('disabled', false);
    const size = number('size', 25);

    return <CloseButton disabled={disabled} onClick={handleClick} size={size} />;
  });
