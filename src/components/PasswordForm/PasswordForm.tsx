import * as React from 'react';
import * as Yup from 'yup';

import withFormik from '../../hocs/withFormik';

import FormField from '../FormField';
import FormFooter from '../FormFooter';
import ScrollGrid, { Form } from '../Responsive';

export interface Values {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

export const validationSchema = Yup.object().shape({
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Required'),
  newPassword: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

interface Props {
  handleSubmit: () => void;
  handleCancel?: () => void;
  isSubmitting: boolean;
  isValid: boolean;
}

export const PasswordForm = (handleCancel: () => void) => ({ handleSubmit, isSubmitting, isValid }: Props) => (
  <Form onSubmit={handleSubmit}>
    <ScrollGrid>
      <FormField isInvalid={!isValid} label="Old Password" name="password" placeholder="Enter Old Password" type="password" />

      <FormField isInvalid={!isValid} label="New Password" name="newPassword" placeholder="Enter New Password" type="password" />

      <FormField isInvalid={!isValid} label="Confirm New Password" name="confirmPassword" placeholder="Enter New Password Again" type="password" />
    </ScrollGrid>

    <FormFooter isSubmitting={isSubmitting} submitDisabled={isSubmitting || !isValid} handleCancel={handleCancel} buttonWidths={153} />
  </Form>
);

const PasswordFormik = withFormik<Values>(PasswordForm, validationSchema);

export default PasswordFormik;
