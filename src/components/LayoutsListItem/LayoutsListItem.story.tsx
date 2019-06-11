import { action } from '@storybook/addon-actions';
import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { exampleUserLayout } from '../../samples/LayoutData';
import { withMarginDecorator } from '../../utils/storybookHelpers';
import { CATEGORIES } from '../../utils/storyCategories';

import LayoutsListItem from './LayoutsListItem';

const close = action('close');

storiesOf(`${CATEGORIES.COMPONENTS}LayoutsListItem`, module)
  .addDecorator(withKnobs)
  .addDecorator(withMarginDecorator())
  .add('default', () => {
    const handleClickDelete = action('handleClickDelete');
    const name = text('name', 'layout');

    return (
      <LayoutsListItem
        activeId={exampleUserLayout.id}
        close={close}
        deleteLayout={action('deleteLayout clicked')}
        handleClickDelete={handleClickDelete}
        id={exampleUserLayout.id}
        name={name}
        restoreLayout={action('restoreLayout clicked')}
        resetActiveId={action('resetActiveId clicked')}
        handleClickShare={action('shareLayout clicked')}
      />
    );
  });
