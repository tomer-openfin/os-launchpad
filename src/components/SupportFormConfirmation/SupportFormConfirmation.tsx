import * as React from 'react';

import { ButtonWrapper, Wrapper } from './SupportFormConfirmation.css';

import Button from '../Button';
import { P } from '../Support/Support.css';

interface Props {
  isSuccess: boolean;
  confirmationNumber?: string;
  handleClose: () => void;
}

const SUPPORT_EMAIL = 'support@openfin.co';

const renderSuccessMessage = () => (
  <>
    <P>Thank you, your support ticket has been submitted.</P>

    <P>
      You may follow up with this ticket by contacting <span>{SUPPORT_EMAIL}</span>.
    </P>
  </>
);

const renderErrorMessage = () => (
  <>
    <P>Unfortunately, your support ticket could not be submitted.</P>

    <P>
      Please contact <span>{SUPPORT_EMAIL}</span> to resolve your issue.
    </P>
  </>
);

const SupportFormConfirmation = ({ handleClose, isSuccess }: Props) => {
  return (
    <Wrapper>
      {isSuccess ? renderSuccessMessage() : renderErrorMessage()}

      <ButtonWrapper>
        <Button width={153} onClick={handleClose}>
          Ok
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default SupportFormConfirmation;
