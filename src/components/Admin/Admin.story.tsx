import { action } from '@storybook/addon-actions';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { noopCreator } from '../../utils/noop';
import { CATEGORIES } from '../../utils/storyCategories';

import Admin from './Admin';

const handleEscDown = action('esc down');

storiesOf(`${CATEGORIES.ADMIN}Admin`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const isAdmin = boolean('isAdmin', false);

    return <Admin hideWindow={noopCreator} isAdmin={isAdmin} onEscDown={handleEscDown} />;
  });
