import * as React from 'react';

import AdminConfirmation, { confirmHandlerCreator } from '../AdminConfirmation';

import { DispatchRequest, User } from '../../types/commons';

interface Props {
  deleteUser: DispatchRequest<User>;
  handleCancel: () => void;
  handleSuccess: () => void;
  id: User['id'];
  user: User;
}

const ConfirmUserDelete = ({ deleteUser, handleCancel, handleSuccess, user }: Props) => {
  if (!user) return null;

  return (
    <AdminConfirmation
      handleCancel={handleCancel}
      headingText="Delete User"
      confirmationText={`Are you sure you want to delete the user:\n${user.firstName} ${user.lastName}?`}
      confirmCtaText="Delete"
      errorMessage={`Sorry, there was an error trying to delete ${user.firstName} ${user.lastName}`}
      onConfirm={confirmHandlerCreator(deleteUser, user)}
      onConfirmSuccess={handleSuccess}
    />
  );
};

export default ConfirmUserDelete;
