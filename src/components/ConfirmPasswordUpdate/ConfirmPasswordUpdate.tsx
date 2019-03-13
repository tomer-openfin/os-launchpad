import * as React from 'react';

import AdminConfirmationView from '../AdminConfirmation/AdminConfirmationView';

const confirmationText =
  'Your password has been successfully updated. You are still logged in, but will need to use your new password the next time you log in.';

const ConfirmPasswordUpdate = ({ handleSuccess }) => {
  return (
    <AdminConfirmationView
      confirmationText={confirmationText}
      confirmCtaText="Ok"
      handleConfirm={handleSuccess}
      headingText="Password Updated"
      withoutCancel
      height="277px"
    />
  );
};

export default ConfirmPasswordUpdate;
