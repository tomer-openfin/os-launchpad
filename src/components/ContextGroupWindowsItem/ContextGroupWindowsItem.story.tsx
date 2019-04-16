import { action } from '@storybook/addon-actions';
import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { withMarginDecorator } from '../../utils/storybookHelpers';
import { CATEGORIES } from '../../utils/storyCategories';

import ContextGroupWindowsItem from './ContextGroupWindowsItem';

const handleRemove = action('handleRemove');

storiesOf(`${CATEGORIES.COMPONENTS}ContextGroupWindowsItem`, module)
  .addDecorator(withKnobs)
  .addDecorator(withMarginDecorator())
  .add('default', () => {
    const name = text('name', 'Window/App Name');

    return <ContextGroupWindowsItem name={name} handleRemove={handleRemove} />;
  });
