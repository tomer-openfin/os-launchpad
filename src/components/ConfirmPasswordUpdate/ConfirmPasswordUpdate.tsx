import * as React from 'react';

import { ROUTES } from '../Router/consts';
import { Wrapper } from './ConfirmPasswordUpdate.css';

import AdminConfirmationView from '../AdminConfirmation/AdminConfirmationView';
import Borders from '../Borders';

const confirmationText =
  'Your password has been successfully updated. You are still logged in, but will need to use your new password the next time you log in.';

const ConfirmPasswordUpdate = () => {
  return (
    <Wrapper>
      <Borders height="100%" width="100%">
        <AdminConfirmationView
          confirmationText={confirmationText}
          confirmCtaText="Ok"
          headingText="Password Updated"
          withoutCancel
          parentRoute={ROUTES.SETTINGS}
        />
      </Borders>
    </Wrapper>
  );
};

export default ConfirmPasswordUpdate;
