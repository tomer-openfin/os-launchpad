import * as React from 'react';

import { EmailText, P } from '../FeedbackForm/FeedbackForm.css';
import { TextWrapper, Wrapper } from './SupportFormConfirmation.css';

import Button from '../Button';
import { Type } from '../Support';

interface Props {
  isSuccess: boolean;
  handleClose: () => void;
  type: Type;
}

const SUPPORT_EMAIL = 'support@openfin.co';

const renderSuccessMessage = (type: Type) => (
  <TextWrapper>
    {type === Type.Feedback && <P>Thank you, your feedback has been submitted.</P>}

    {type === Type.Bug && <P>Thank you, your support ticket has been submitted.</P>}

    {type === Type.Feedback && (
      <P>
        If you have any other questions, please contact <EmailText>{SUPPORT_EMAIL}</EmailText>.
      </P>
    )}

    {type === Type.Bug && (
      <P>
        You may follow up with this ticket by contacting <EmailText>{SUPPORT_EMAIL}</EmailText>.
      </P>
    )}
  </TextWrapper>
);

const renderErrorMessage = (type: Type) => (
  <TextWrapper>
    {type === Type.Feedback && <P>Unfortunately, an error occurred while submitting your feedback. We value your input, so please try again later.</P>}

    {type === Type.Bug && <P>Unfortunately, your support ticket could not be submitted.</P>}

    {type === Type.Feedback && (
      <P>
        If this error persists, please notify <EmailText>{SUPPORT_EMAIL}</EmailText>
      </P>
    )}

    {type === Type.Bug && (
      <P>
        Please contact <EmailText>{SUPPORT_EMAIL} to resolve your issue.</EmailText>
      </P>
    )}
  </TextWrapper>
);

const SupportFormConfirmation = ({ handleClose, isSuccess, type }: Props) => {
  return (
    <Wrapper>
      {isSuccess ? renderSuccessMessage(type) : renderErrorMessage(type)}

      <Button width={305} onClick={handleClose}>
        Ok
      </Button>
    </Wrapper>
  );
};

export default SupportFormConfirmation;
