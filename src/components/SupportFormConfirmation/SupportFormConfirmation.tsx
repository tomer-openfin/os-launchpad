import * as React from 'react';

import { ButtonWrapper, EmailText, P } from '../Support/Support.css';
import { TextWrapper, Wrapper } from './SupportFormConfirmation.css';

import Button from '../Button';

interface Props {
  isSuccess: boolean;
  confirmationNumber?: string;
  handleClose: () => void;
}

const SUPPORT_EMAIL = 'support@openfin.co';

const renderSuccessMessage = () => (
  <TextWrapper>
    <P>Thank you, your support ticket has been submitted.</P>

    <P>
      You may follow up with this ticket by contacting <EmailText>{SUPPORT_EMAIL}</EmailText>.
    </P>
  </TextWrapper>
);

const renderErrorMessage = () => (
  <TextWrapper>
    <P>Unfortunately, your support ticket could not be submitted.</P>

    <P>
      Please contact <EmailText>{SUPPORT_EMAIL}</EmailText> to resolve your issue.
    </P>
  </TextWrapper>
);

const SupportFormConfirmation = ({ handleClose, isSuccess }: Props) => {
  return (
    <Wrapper>
      {isSuccess ? renderSuccessMessage() : renderErrorMessage()}

      <ButtonWrapper>
        <Button width={305} onClick={handleClose}>
          Ok
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default SupportFormConfirmation;
