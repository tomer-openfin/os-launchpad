import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import styled from 'styled-components';

import { CATEGORIES } from '../../utils/storyCategories';

import LayoutsUserActions from './LayoutsUserActions';

const Wrapper = styled.div`
  width: 171px;
  height: 48px;
`;

storiesOf(`${CATEGORIES.COMPONENTS}LayoutsUserActions`, module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return (
      <Wrapper>
        <LayoutsUserActions deleteLayout={action('deleteLayout clicked')} saveLayout={action('saveLayout clicked')} />
      </Wrapper>
    );
  });
