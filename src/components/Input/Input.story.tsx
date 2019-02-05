import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import Input from './Input.css';

const INPUT_TYPES = {
  email: 'email',
  password: 'password',
  text: 'text',
};

storiesOf(`${CATEGORIES.UI}Input`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const type = select('input type', INPUT_TYPES, INPUT_TYPES.text);
    const placeholder = text('placeholder', 'Placeholder');
    const hasError = boolean('hasError', false);

    return <Input hasError={hasError} placeholder={placeholder} type={type} />;
  });
