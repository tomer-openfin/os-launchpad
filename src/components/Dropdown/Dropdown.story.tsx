import { action } from '@storybook/addon-actions';
import { boolean, number, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { withMarginDecorator } from '../../utils/storybookHelpers';
import { CATEGORIES } from '../../utils/storyCategories';

import Dropdown from './Dropdown';

const options = [{ label: 'OpenFin One', value: 'one' }, { label: 'OpenFin Two', value: 'two' }, { label: 'OpenFin Three', value: 'three' }];

const onSelect = action('onSelect');
const width = number('Width', 140);

storiesOf(`${CATEGORIES.UI}Dropdown`, module)
  .addDecorator(withKnobs)
  .addDecorator(withMarginDecorator())
  .add('default', () => {
    return <Dropdown onSelect={onSelect} options={options} selected={options[0].value} width={width} />;
  });
