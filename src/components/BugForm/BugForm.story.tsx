import { action } from '@storybook/addon-actions';
import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import BugForm from './BugForm';

storiesOf(`${CATEGORIES.COMPONENTS}BugForm`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const handleClose = action('handleClose');
    const handleSubmit = action('handleSubmit');
    const handleChange = action('handleChange');
    const inputValue = text('input value', '');

    return <BugForm handleClose={handleClose} handleSubmit={handleSubmit} handleChange={handleChange} inputValue={inputValue} />;
  });
