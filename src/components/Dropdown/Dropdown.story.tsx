import { action } from '@storybook/addon-actions';
import { boolean, color, number, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { withMarginDecorator } from '../../utils/storybookHelpers';
import { CATEGORIES } from '../../utils/storyCategories';

import Dropdown from './Dropdown.css';

storiesOf(`${CATEGORIES.UI}Dropdown`, module)
  .addDecorator(withKnobs)
  .addDecorator(withMarginDecorator())
  .add('with knobs', () => {
    const open = boolean('Open', false);
    const selectedIndex = number('Selected Index', 0);
    const selected = select(
      'Options',
      [{ label: 'option one', value: 'one' }, { label: 'option two', value: 'two' }, { label: 'option three', value: 'three' }],
      { label: 'option one', value: 'one' },
    );
    const width = number('Width', 200);

    // const options = select('Options');

    // const options = boolean(Option)[];
    // const selectOption = boolean(action)('Select Option');
    // const width? = boolean(number) | string;

    return <Dropdown width={width} />;
  });
