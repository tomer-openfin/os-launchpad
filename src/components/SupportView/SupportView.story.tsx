import { action } from '@storybook/addon-actions';
import { select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import { Stage, SupportView } from './SupportView';

storiesOf(`${CATEGORIES.COMPONENTS}SupportView`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const handleClose = action('handleClose');
    const handleSubmit = action('handleSubmit');
    const handleChange = action('handleChange');
    const stage = select('stage', Object(Stage), Stage.Default);
    const inputValue = text('inputValue', '');

    return <SupportView handleChange={handleChange} stage={stage} inputValue={inputValue} handleClose={handleClose} handleSubmit={handleSubmit} />;
  });
