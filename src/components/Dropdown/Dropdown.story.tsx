import { action } from '@storybook/addon-actions';
import { boolean, number, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { withMarginDecorator } from '../../utils/storybookHelpers';
import { CATEGORIES } from '../../utils/storyCategories';

import Dropdown, { DropdownView } from './Dropdown';

const options = [{ label: 'OpenFin One', value: 'one' }, { label: 'OpenFin Two', value: 'two' }, { label: 'OpenFin Three', value: 'three' }];

const onSelect = action('onSelect');
const width = number('Width', 140);

storiesOf(`${CATEGORIES.UI}Dropdown`, module)
  .addDecorator(withKnobs)
  .addDecorator(withMarginDecorator())
  .add('default', () => {
    const open = boolean('Open', false);
    const toggleOpen = action('toggle open');

    return <DropdownView onSelect={onSelect} open={open} options={options} selected={options[0].value} toggleOpen={toggleOpen} width={width} />;
  })
  .add('with state', () => {
    return <Dropdown onSelect={onSelect} options={options} selected={options[0].value} width={width} />;
  });
