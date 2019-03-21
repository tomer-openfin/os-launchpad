import { action } from '@storybook/addon-actions';
import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import FeedbackForm from './FeedbackForm';

storiesOf(`${CATEGORIES.COMPONENTS}FeedbackForm`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const handleClose = action('handleClose');
    const handleSubmit = action('handleSubmit');
    const handleChange = action('handleChange');

    // return <FeedbackForm handleClose={handleClose} handleSubmit={handleSubmit} handleChange={handleChange} />;
  });
