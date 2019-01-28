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

const close = action('close');

storiesOf(`${CATEGORIES.COMPONENTS}LayoutsList`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return (
      <LayoutsList close={close} deleteLayout={action('deleteLayout clicked')} layouts={[exampleUserLayout]} restoreLayout={action('restoreLayout clicked')} />
    );
  })
  .add('with Wrapper', () => {
    return (
      <Wrapper>
        <LayoutsList
          close={close}
          deleteLayout={action('deleteLayout clicked')}
          layouts={[exampleUserLayout]}
          restoreLayout={action('restoreLayout clicked')}
        />
      </Wrapper>
    );
  });
