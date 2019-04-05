import { action } from '@storybook/addon-actions';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import Settings from './Settings';

storiesOf(`${CATEGORIES.COMPONENTS}Settings`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const hideWindow = action('hideWindow');
    const handleClose = action('handleClose');
    const handleConfirm = action('handleConfirm');
    const isEnterprise = boolean('isEnterprise', false);

    return <Settings handleClose={handleClose} handleConfirm={handleConfirm} hideWindow={hideWindow} isEnterprise={isEnterprise} />;
  });
