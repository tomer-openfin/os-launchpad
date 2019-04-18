import * as React from 'react';

import { action } from '@storybook/addon-actions';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { CATEGORIES } from '../../utils/storyCategories';

import Checkbox from './Checkbox';

storiesOf(`${CATEGORIES.UI}Checkbox`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const label = text('Label Text', 'Place Text Here');
    const checked = boolean('checked', false);
    const onChange = action('onChange');

    return <Checkbox label={label} onChange={onChange} checked={checked} />;
  });
