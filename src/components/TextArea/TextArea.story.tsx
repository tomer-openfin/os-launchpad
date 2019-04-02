import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';
import TextArea from './TextArea.css';

storiesOf(`${CATEGORIES.UI}TextArea`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const placeholder = text('placeholder', 'hello world');
    const value = text('value', '');

    return <TextArea height={135} placeholder={placeholder} value={value} width="100%" />;
  });
