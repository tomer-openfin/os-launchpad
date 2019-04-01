import * as React from 'react';

import { EmailText, P } from '../FeedbackForm/FeedbackForm.css';
import { TextWrapper } from './SupportFormConfirmation.css';

const SUPPORT_EMAIL = 'support@openfin.co';

export const FeedbackSuccess = () => (
  <TextWrapper>
    <P>Thank you, your feedback has been submitted.</P>

    <P>
      If you have any other questions, please contact <EmailText>{SUPPORT_EMAIL}</EmailText>.
    </P>
  </TextWrapper>
);

export const BugSuccess = () => (
  <TextWrapper>
    <P>Thank you, your support ticket has been submitted.</P>

    <P>
      You may follow up with this ticket by contacting <EmailText>{SUPPORT_EMAIL}</EmailText>.
    </P>
  </TextWrapper>
);

export const FeedbackError = () => (
  <TextWrapper>
    <P>Unfortunately, an error occurred while submitting your feedback. We value your input, so please try again later.</P>

    <P>
      If this error persists, please notify <EmailText>{SUPPORT_EMAIL}</EmailText>
    </P>
  </TextWrapper>
);

export const BugError = () => (
  <TextWrapper>
    <P>Unfortunately, your support ticket could not be submitted.</P>

    <P>
      Please contact <EmailText>{SUPPORT_EMAIL} to resolve your issue.</EmailText>
    </P>
  </TextWrapper>
);
