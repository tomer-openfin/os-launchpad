import { action } from '@storybook/addon-actions';
import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import styled from 'styled-components';

import { exampleUserLayout } from '../../samples/LayoutData';
import { CATEGORIES } from '../../utils/storyCategories';
import LayoutsListItem from './LayoutsListItem';

const Wrapper = styled.div`
  max-height: 154px;
  max-width: 149px;
`;

storiesOf(`${CATEGORIES.COMPONENTS}LayoutsListItem`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const name = text('name', 'layout');

    return (
      <Wrapper>
        <LayoutsListItem deleteLayout={action('deleteLayout clicked')} id={exampleUserLayout.id} name={name} restoreLayout={action('restoreLayout clicked')} />
      </Wrapper>
    );
  });
