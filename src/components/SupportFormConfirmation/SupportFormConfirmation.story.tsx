import { action } from '@storybook/addon-actions';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import { Type } from '../Support/Support';
import SupportFormConfirmation from './SupportFormConfirmation';

storiesOf(`${CATEGORIES.COMPONENTS}SupportFormConfirmation`, module)
  .addDecorator(withKnobs)
  .add('default bug success', () => {
    const handleClose = action('handleClose');
    const isSuccess = boolean('isSuccess', true);
    const type = select('type', Object(Type), Type.Bug);

    return <SupportFormConfirmation handleClose={handleClose} isSuccess={isSuccess} type={type} />;
  });
