import { action } from '@storybook/addon-actions';
import { select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import { Stage, SupportView } from './Support';

storiesOf(`${CATEGORIES.COMPONENTS}Support`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const handleChange = action('handleChange');
    const handleClose = action('handleClose');
    const handleSubmit = action('handleSubmit');
    const inputValue = text('inputValue', '');
    const referenceNumber = text('referenceNumber', '1234567890');
    const stage = select('stage', Object(Stage), Stage.Default);

    return (
      <SupportView
        handleChange={handleChange}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        inputValue={inputValue}
        referenceNumber={referenceNumber}
        stage={stage}
      />
    );
  });
