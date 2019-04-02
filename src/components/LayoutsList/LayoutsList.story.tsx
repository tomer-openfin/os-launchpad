import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import styled from 'styled-components';

import { exampleUserLayouts } from '../../samples/LayoutData';
import { withMarginDecorator } from '../../utils/storybookHelpers';
import { CATEGORIES } from '../../utils/storyCategories';

import LayoutsList from './LayoutsList';

const Wrapper = styled.div`
  width: 171px;
`;

const close = action('close');

storiesOf(`${CATEGORIES.COMPONENTS}LayoutsList`, module)
  .addDecorator(withKnobs)
  .addDecorator(withMarginDecorator())
  .add('default', () => {
    return (
      <LayoutsList close={close} deleteLayout={action('deleteLayout clicked')} layouts={exampleUserLayouts} restoreLayout={action('restoreLayout clicked')} />
    );
  })
  .add('with Wrapper', () => {
    return (
      <Wrapper>
        <LayoutsList close={close} deleteLayout={action('deleteLayout clicked')} layouts={exampleUserLayouts} restoreLayout={action('restoreLayout clicked')} />
      </Wrapper>
    );
  });
