import { action } from '@storybook/addon-actions';
import { select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import { Stage, SupportView } from './Support';

storiesOf(`${CATEGORIES.COMPONENTS}Support`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const handleClose = action('handleClose');
    const setStage = action('setStage');
    const referenceNumber = text('referenceNumber', '1234567890');
    const stage = select('stage', Object(Stage), Stage.Default);

    return <SupportView handleClose={handleClose} referenceNumber={referenceNumber} setStage={setStage} stage={stage} />;
  });
