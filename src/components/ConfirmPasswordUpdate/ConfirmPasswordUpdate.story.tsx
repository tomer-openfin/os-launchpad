import { storiesOf } from '@storybook/react';
import * as React from 'react';
import styled from 'styled-components';

import ConfirmPasswordUpdate from './ConfirmPasswordUpdate';

import { withMarginDecorator } from '../../utils/storybookHelpers';
import { CATEGORIES } from '../../utils/storyCategories';

const Wrapper = styled.div`
  height: 277px;
  width: 420px;
`;

storiesOf(`${CATEGORIES.COMPONENTS}ConfirmPasswordUpdate`, module)
  .addDecorator(withMarginDecorator(30))
  .add('default', () => {
    return (
      <Wrapper>
        <ConfirmPasswordUpdate />
      </Wrapper>
    );
  });
