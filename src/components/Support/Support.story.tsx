import { action } from '@storybook/addon-actions';
import { select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import { Stage, SupportView, Type } from './Support';

storiesOf(`${CATEGORIES.COMPONENTS}Support`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const handleClose = action('handleClose');
    const handleError = action('handleError');
    const handleReset = action('handleReset');
    const handleSuccess = action('handleSuccess');
    const setType = action('setType');
    const stage = select('stage', Object(Stage), Stage.Default);
    const type = select('type', Object(Type), Type.Default);

    return (
      <SupportView
        handleClose={handleClose}
        handleError={handleError}
        handleReset={handleReset}
        handleSuccess={handleSuccess}
        setType={setType}
        stage={stage}
        type={type}
      />
    );
  });
