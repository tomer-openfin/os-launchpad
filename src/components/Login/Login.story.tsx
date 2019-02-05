import { action } from '@storybook/addon-actions';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import Login, { LoginView, Stage } from './Login';

const closeApplication = action('closeApplication');
const handleError = action('handleError');

storiesOf(`${CATEGORIES.COMPONENTS}Login`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const stage = select('stage', Object(Stage), Stage.Login);
    const message = text('message', '');
    const error = boolean('error', false);

    return <LoginView closeApplication={closeApplication} error={error} handleError={handleError} message={message} session="" stage={stage} username="" />;
  })
  .add('withStages', () => <Login closeApplication={closeApplication} />);
