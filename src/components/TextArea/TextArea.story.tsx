import { action } from '@storybook/addon-actions';
import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';
import TextArea from './TextArea';

const handleChange = action('Changing');

storiesOf(`${CATEGORIES.UI}TextArea`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const placeholder = text('placeholder', 'hello world');
    const value = text('value', '');

    return <TextArea value={value} handleChange={handleChange} placeholder={placeholder} />;
  });
