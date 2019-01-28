import { action } from '@storybook/addon-actions';
import { number, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import SearchInput, { defaultProps } from './SearchInput';
import SearchInputWithState from './SearchInputWithState';

storiesOf(`${CATEGORIES.UI}SearchInput`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const placeholder = text('placeholder', 'Search...');
    const value = text('value', '');
    const width = number('width', defaultProps.width);

    return <SearchInput onChange={action('onChange')} onClear={action('onClear')} placeholder={placeholder} value={value} width={width} />;
  })
  .add('with State', () => {
    const placeholder = text('placeholder', 'Search...');
    const width = number('width', defaultProps.width);

    return <SearchInputWithState onChange={action('onChange')} placeholder={placeholder} width={width} />;
  });
