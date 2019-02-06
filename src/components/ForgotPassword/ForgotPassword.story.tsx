import { action } from '@storybook/addon-actions';
import { select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import ForgotPassword, { ForgotPasswordView, Stage } from './ForgotPassword';

const handleClose = action('handleClose');
const handleError = action('handleError');
const transition = action('transition');

storiesOf(`${CATEGORIES.COMPONENTS}ForgotPassword`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const stage = select('stage', Object(Stage), Stage.Request);
    const errorMessage = text('errorMessage', '');

    return <ForgotPasswordView handleClose={handleClose} handleError={handleError} message={errorMessage} transition={transition} stage={stage} username="" />;
  })
  .add('withStages', () => {
    return <ForgotPassword handleClose={handleClose} />;
  });
