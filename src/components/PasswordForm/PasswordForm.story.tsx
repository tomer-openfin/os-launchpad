import { storiesOf } from '@storybook/react';
import { Formik } from 'formik';
import * as React from 'react';
import styled from 'styled-components';

import PasswordForm from './PasswordForm';

import noop from '../../utils/noop';
import { withMarginDecorator } from '../../utils/storybookHelpers';
import { CATEGORIES } from '../../utils/storyCategories';

const Wrapper = styled.div`
  width: 420px;
  height: 405px;
`;

storiesOf(`${CATEGORIES.COMPONENTS}PasswordForm`, module)
  .addDecorator(withMarginDecorator(15))
  .add('default', () => {
    return (
      <Wrapper>
        <Formik initialValues={{}} onSubmit={noop} validateOnChange={false} render={PasswordForm} />
      </Wrapper>
    );
  });
