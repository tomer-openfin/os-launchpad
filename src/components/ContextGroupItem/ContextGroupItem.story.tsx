import { action } from '@storybook/addon-actions';
import { color, number, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import ContextGroupItem from './ContextGroupItem';

const handleEdit = action('handleEdit');

storiesOf(`${CATEGORIES.COMPONENTS}ContextGroupItem`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const channelColor = color('color', 'red');
    const contextName = text('contextName', '');
    const count = number('count', 0);
    const name = text('name', 'Red');

    return <ContextGroupItem color={channelColor} contextName={contextName} count={count} handleEdit={handleEdit} name={name} />;
  });
