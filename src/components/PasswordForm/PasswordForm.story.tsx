import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { Formik, FormikProps, FormikValues } from 'formik';
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
  .addDecorator(withMarginDecorator())
  .add('default', () => {
    const handleCancel = action('handleCancel');
    const renderPasswordForm = (formikProps: FormikProps<FormikValues>) => <PasswordForm {...formikProps} handleCancel={handleCancel} />;

    return (
      <Wrapper>
        <Formik initialValues={{}} onSubmit={noop} validateOnChange={false} render={renderPasswordForm} />
      </Wrapper>
    );
  });
