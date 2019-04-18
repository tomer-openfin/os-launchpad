import { action } from '@storybook/addon-actions';
import { color, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import { withMarginDecorator } from '../../utils/storybookHelpers';
import ContextWindowsItem from './ContextWindowsItem';

const handleAdd = action('handleAdd');

storiesOf(`${CATEGORIES.COMPONENTS}ContextWindowsItem`, module)
  .addDecorator(withKnobs)
  .addDecorator(withMarginDecorator())
  .add('default', () => {
    const contextColor = color('color', '');
    const colorTitle = text('colorTitle', '');
    const name = text('name', 'App/Window Name');

    return <ContextWindowsItem color={contextColor} colorTitle={colorTitle} handleAdd={handleAdd} name={name} />;
  });
