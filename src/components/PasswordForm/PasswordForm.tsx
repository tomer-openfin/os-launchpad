import * as React from 'react';

import { ROUTES } from '../Router/consts';

import { validateTextField } from '../../utils/validators';

import FormField from '../FormField';
import ResponsiveForm from '../ResponsiveForm';

interface Props {
  isSubmitting: boolean;
  isValid: boolean;
}

const PasswordForm = ({ isSubmitting, isValid }: Props) => (
  <ResponsiveForm buttonWidths={153} parentRoute={ROUTES.SETTINGS} submitDisabled={isSubmitting || !isValid}>
    <FormField isInvalid={!isValid} label="Old Password" name="password" placeholder="Enter Old Password" type="password" validate={validateTextField} />

    <FormField isInvalid={!isValid} label="New Password" name="newPassword" placeholder="Enter New Password" type="password" validate={validateTextField} />

    <FormField
      isInvalid={!isValid}
      label="Confirm New Password"
      name="confirmPassword"
      placeholder="Enter New Password Again"
      type="password"
      validate={validateTextField}
    />
  </ResponsiveForm>
);

export default PasswordForm;
