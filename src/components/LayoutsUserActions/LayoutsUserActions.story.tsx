import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { CATEGORIES } from '../../utils/storyCategories';

import { withMarginDecorator } from '../../utils/storybookHelpers';
import LayoutsUserActions from './LayoutsUserActions';

const dismissUndoLayout = action('dismissUndoLayout');
const saveLayout = action('saveLayout');
const undoLayout = action('undoLayout');
const shareLayout = action('shareLayout');

storiesOf(`${CATEGORIES.COMPONENTS}LayoutsUserActions`, module)
  .addDecorator(withKnobs)
  .addDecorator(withMarginDecorator())
  .add('default', () => {
    return <LayoutsUserActions dismissUndoLayout={dismissUndoLayout} saveLayout={saveLayout} shareLayout={shareLayout} undoLayout={undoLayout} />;
  });
