import { action } from '@storybook/addon-actions';
import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import SupportForm from './SupportForm';

storiesOf(`${CATEGORIES.COMPONENTS}SupportForm`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const handleClose = action('handleClose');
    const handleSubmit = action('handleSubmit');
    const handleChange = action('handleChange');
    const inputValue = text('input value', '');

    return <SupportForm handleClose={handleClose} handleSubmit={handleSubmit} handleChange={handleChange} inputValue={inputValue} />;
  });
