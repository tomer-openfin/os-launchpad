import * as React from 'react';

import noop from '../../utils/noop';

import { ButtonWrapper, P, StyledButton, Wrapper } from './Support.css';

import Borders from '../Borders';
import BugForm from '../BugForm';
import FeedbackForm from '../FeedbackForm';
import SupportFormConfirmation from '../SupportFormConfirmation';
import WindowHeader from '../WindowHeader';

const SUPPORT_EMAIL = 'support@openfin.co';
export const BUG_HEADER = 'Report a Bug';
export const FEEDBACK_HEADER = 'Provide Feedback';
export const CONTACT_HEADER = 'Contact Support';

export enum Stage {
  BugFailure = 'bug-failure',
  BugSuccess = 'bug-success',
  Default = 'default',
  FeedbackFailure = 'feedback-failure',
  FeedbackSuccess = 'feedback-success',
  ProvideFeedback = 'provide-feedback',
  ReportBug = 'report-bug',
}

interface Props {
  referenceNumber: string | number; // TODO: get from BE response on report bug response
  handleClose: () => void;
}

interface State {
  stage: Stage;
}

interface ViewProps extends Props, State {
  setStage: (stage: Stage) => void;
}

export const SupportView = (props: ViewProps) => {
  const { setStage, stage, referenceNumber, handleClose } = props;

  const createHandleStage = (nextStage: Stage) => () => setStage(nextStage);

  const handleCancel = createHandleStage(Stage.Default);

  const constructHeader = (currentStage: Stage) => {
    switch (currentStage) {
      case Stage.Default:
        return <WindowHeader handleClose={handleClose}>{CONTACT_HEADER}</WindowHeader>;
      case Stage.BugFailure:
      case Stage.BugSuccess:
      case Stage.ReportBug:
        return <WindowHeader handleBack={createHandleStage(Stage.Default)}>{BUG_HEADER}</WindowHeader>;
      case Stage.FeedbackFailure:
      case Stage.FeedbackSuccess:
      case Stage.ProvideFeedback:
        return <WindowHeader handleBack={createHandleStage(Stage.Default)}>{FEEDBACK_HEADER}</WindowHeader>;
      default:
        return <WindowHeader handleClose={handleClose}>{CONTACT_HEADER}</WindowHeader>;
    }
  };

  return (
    <Borders height="100%" width="100%">
      {constructHeader(stage)}

      {stage === Stage.Default && (
        <ButtonWrapper>
          <StyledButton onClick={createHandleStage(Stage.ProvideFeedback)} width={161}>
            Submit Feedback
          </StyledButton>

          <StyledButton onClick={createHandleStage(Stage.ReportBug)} width={161}>
            Report a Bug
          </StyledButton>
        </ButtonWrapper>
      )}

      {stage === Stage.ProvideFeedback && <FeedbackForm handleCancel={handleCancel} />}

      {stage === Stage.ReportBug && <BugForm handleCancel={handleCancel} />}

      {stage === Stage.BugSuccess && (
        <SupportFormConfirmation handleClose={noop}>
          <P>Thank you, your support ticket has been submitted.</P>

          <P>{`Your reference number is #${referenceNumber}.`}</P>

          <P>
            You may follow up with this ticket by contacting <span>{SUPPORT_EMAIL}</span>.
          </P>
        </SupportFormConfirmation>
      )}

      {stage === Stage.FeedbackSuccess && (
        <SupportFormConfirmation handleClose={handleClose}>
          <P>Thank you, your support ticket has been submitted.</P>

          <P>{`Your reference number is #${referenceNumber}.`}</P>

          <P>
            You may follow up with this ticket by contacting <span>{SUPPORT_EMAIL}</span>.
          </P>
        </SupportFormConfirmation>
      )}

      {stage === Stage.BugFailure && (
        <SupportFormConfirmation handleClose={handleClose}>
          <P>Unfortunately, your support ticket could not be submitted.</P>

          <P>
            Please contact <span>{SUPPORT_EMAIL}</span> to resolve your issue.
          </P>
        </SupportFormConfirmation>
      )}

      {stage === Stage.FeedbackFailure && (
        <SupportFormConfirmation handleClose={handleClose}>
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

  setStage = (stage: Stage) => {
    this.setState({ stage });
  };

  render() {
    return (
      <Wrapper>
        <SupportView setStage={this.setStage} {...this.props} {...this.state} />
      </Wrapper>
    );
  }
}

export default Support;
