import * as React from 'react';

import { User } from '../../types/commons';

import withFormik from '../../hocs/withFormik';

import UserForm, { editUserSchema } from '../UserForm';

interface Props {
  handleSubmit: () => void;
  isSubmitting: boolean;
  isValid: boolean;
}

export const EditUserForm = (handleCancel: () => void) => ({ handleSubmit, isSubmitting, isValid }: Props) => (
  <UserForm handleSubmit={handleSubmit} isSubmitting={isSubmitting} isValid={isValid} handleCancel={handleCancel} />
);

const EditUserFormik = withFormik<User>(EditUserForm, editUserSchema);

export default EditUserFormik;
