import * as React from 'react';

import { Wrapper } from './ConfirmPasswordUpdate.css';

import AdminConfirmationView from '../AdminConfirmation/AdminConfirmationView';
import Borders from '../Borders';

const confirmationText =
  'Your password has been successfully updated. You are still logged in, but will need to use your new password the next time you log in.';

interface Props {
  handleSuccess?: () => void;
}

const ConfirmPasswordUpdate = ({ handleSuccess }: Props) => (
  <Wrapper>
    <Borders height="100%" width="100%">
      <AdminConfirmationView
        confirmationText={confirmationText}
        confirmCtaText="Ok"
        handleConfirm={handleSuccess}
        headingText="Password Updated"
        withoutCancel
      />
    </Borders>
  </Wrapper>
);

export default ConfirmPasswordUpdate;
