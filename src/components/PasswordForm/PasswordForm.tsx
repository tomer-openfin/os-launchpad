import * as React from 'react';

import FormField from '../FormField';
import ResponsiveForm from '../ResponsiveForm';

interface Props {
  handleCancel?: () => void;
  isSubmitting: boolean;
  isValid: boolean;
}

const PasswordForm = ({ handleCancel, isSubmitting, isValid }: Props) => (
  <ResponsiveForm buttonWidths={153} handleCancel={handleCancel} isSubmitting={isSubmitting} submitDisabled={isSubmitting || !isValid}>
    <FormField isInvalid={!isValid} label="Old Password" name="password" placeholder="Enter Old Password" type="password" />

    <FormField isInvalid={!isValid} label="New Password" name="newPassword" placeholder="Enter New Password" type="password" />

    <FormField isInvalid={!isValid} label="Confirm New Password" name="confirmPassword" placeholder="Enter New Password Again" type="password" />
  </ResponsiveForm>
);

export default PasswordForm;
