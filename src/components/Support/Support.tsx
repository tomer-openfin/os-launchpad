import * as React from 'react';

import { ButtonWrapper, StyledButton, Wrapper } from './Support.css';

import Borders from '../Borders';
import BugForm from '../BugForm';
import FeedbackForm from '../FeedbackForm';
import SupportFormConfirmation from '../SupportFormConfirmation';
import WindowHeader from '../WindowHeader';

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
  referenceNumber?: string | number; // TODO: get from BE response on report bug response
  handleClose: () => void;
}

interface State {
  stage: Stage;
}

interface ViewProps extends Props, State {
  setStage: (stage: Stage) => void;
  handleError: () => void;
  handleSuccess: (confirmationNumber?: string) => void;
}

export const SupportView = (props: ViewProps) => {
  const { setStage, stage, handleClose, handleError, handleSuccess } = props;

  const createHandleStage = (nextStage: Stage) => () => setStage(nextStage);

  const handleReset = createHandleStage(Stage.Default);
  const handleCancel = handleReset;

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

      {stage === Stage.ProvideFeedback && <FeedbackForm handleSuccess={handleSuccess} handleError={handleError} handleCancel={handleCancel} />}

      {stage === Stage.ReportBug && <BugForm handleSuccess={handleSuccess} handleError={handleError} handleCancel={handleCancel} />}

      {(stage === Stage.BugSuccess || stage === Stage.FeedbackSuccess) && <SupportFormConfirmation isSuccess={true} handleClose={handleReset} />}

      {(stage === Stage.BugFailure || stage === Stage.FeedbackFailure) && <SupportFormConfirmation isSuccess={false} handleClose={handleReset} />}
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

  handleError = () => {
    const nextStage = this.state.stage === Stage.ReportBug ? Stage.BugFailure : Stage.FeedbackFailure;
    this.setState({ stage: nextStage });
  };

  handleSuccess = () => {
    const nextStage = this.state.stage === Stage.ReportBug ? Stage.BugSuccess : Stage.FeedbackSuccess;
    this.setState({ stage: nextStage });
  };

  render() {
    return (
      <Wrapper>
        <SupportView setStage={this.setStage} handleError={this.handleSuccess} handleSuccess={this.handleSuccess} {...this.props} {...this.state} />
      </Wrapper>
    );
  }
}

export default Support;
