import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { noopCreator } from '../../utils/noop';
import { CATEGORIES } from '../../utils/storyCategories';

import Admin from './Admin';

storiesOf(`${CATEGORIES.ADMIN}Admin`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const isAdmin = boolean('isAdmin', false);

    return <Admin hideWindow={noopCreator} isAdmin={isAdmin} />;
  });
