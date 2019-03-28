import * as React from 'react';

import noop from '../../utils/noop';

import { P, Wrapper } from './Support.css';

import Borders from '../Borders';
import BugForm from '../BugForm';
import FeedbackForm from '../FeedbackForm';
import SupportFormConfirmation from '../SupportFormConfirmation';
import WindowHeader from '../WindowHeader';

const SUPPORT_EMAIL = 'support@openfin.co';

export enum Stage {
  Default = 'default',
  Failure = 'failure',
  ProvideFeedback = 'provide-feedback',
  ReportBug = 'report-bug',
  Success = 'success',
}

interface Props {
  referenceNumber: string | number;
  handleClose: () => void;
  handleSubmit: () => void;
}

interface State {
  stage: Stage;
}

interface ViewProps extends Props, State {}

export const SupportView = (props: ViewProps) => {
  const { stage, referenceNumber, handleClose } = props;

  return (
    <Borders height="100%" width="100%">
      <WindowHeader handleClose={handleClose}>Contact Support</WindowHeader>

      {stage === Stage.ProvideFeedback && <FeedbackForm />}
      {stage === Stage.ReportBug && <BugForm />}

      {stage === Stage.Success && (
        <SupportFormConfirmation handleClose={noop}>
          <P>Thank you, your support ticket has been submitted.</P>

          <P>{`Your reference number is #${referenceNumber}.`}</P>

          <P>
            You may follow up with this ticket by contacting <span>{SUPPORT_EMAIL}</span>.
          </P>
        </SupportFormConfirmation>
      )}

      {stage === Stage.Failure && (
        <SupportFormConfirmation handleClose={noop}>
          <P>Unfortunately, your support ticket could not be submitted.</P>

          <P>
            Please contact <span>{SUPPORT_EMAIL}</span> to resolve your issue.
          </P>
        </SupportFormConfirmation>
      )}
    </Borders>
  );
};

class Support extends React.Component<Props, State> {
  state = {
    stage: Stage.Default,
  };

  render() {
    return (
      <Wrapper width="420px">
        <SupportView {...this.props} {...this.state} />
      </Wrapper>
    );
  }
}

export default Support;
