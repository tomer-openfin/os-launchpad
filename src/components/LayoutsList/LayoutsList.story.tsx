import * as React from 'react';
import styled from 'styled-components';

import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { exampleUserLayout } from '../../samples/LayoutData';
import { CATEGORIES } from '../../utils/storyCategories';

import LayoutsList from './LayoutsList';

const Wrapper = styled.div`
  width: 171px;
`;

storiesOf(`${CATEGORIES.COMPONENTS}LayoutsList`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return <LayoutsList deleteLayout={action('deleteLayout clicked')} restoreLayout={action('restoreLayout clicked')} layouts={[exampleUserLayout]} />;
  })
  .add('with Wrapper', () => {
    return (
      <Wrapper>
        <LayoutsList deleteLayout={action('deleteLayout clicked')} restoreLayout={action('restoreLayout clicked')} layouts={[exampleUserLayout]} />
      </Wrapper>
    );
  });