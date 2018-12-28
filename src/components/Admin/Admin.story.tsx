import { action } from '@storybook/addon-actions';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import Admin from './Admin';

const handleEscDown = action('esc down');

storiesOf(`${CATEGORIES.ADMIN}Admin`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const isAdmin = boolean('isAdmin', false);

    return <Admin isAdmin={isAdmin} onEscDown={handleEscDown} />;
  });
