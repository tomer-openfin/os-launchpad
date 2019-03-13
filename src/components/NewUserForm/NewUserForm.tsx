import * as React from 'react';

import { User } from '../../types/commons';

import withFormik from '../../hocs/withFormik';

import UserForm, { newUserSchema } from '../UserForm';

interface FormProps {
  handleSubmit: () => void;
  isSubmitting: boolean;
  isValid: boolean;
}

export const NewUserForm = (handleCancel: () => void) => ({ handleSubmit, isSubmitting, isValid }: FormProps) => (
  <UserForm handleCancel={handleCancel} handleSubmit={handleSubmit} isSubmitting={isSubmitting} isValid={isValid} withPasswordField />
);

const NewUserFormik = withFormik<User>(NewUserForm, newUserSchema);

export default NewUserFormik;
