import * as React from 'react';

import noop from '../../utils/noop';

import { P } from './Support.css';

import Borders from '../Borders';
import SupportForm from '../SupportForm';
import SupportFormConfirmation from '../SupportFormConfirmation';
import WindowHeader from '../WindowHeader';

const SUPPORT_EMAIL = 'support@openfin.co';

export enum Stage {
  Default = 'default',
  Success = 'success',
  Failure = 'failure',
}

interface Props {
  referenceNumber: string | number;
  handleClose: () => void;
  handleSubmit: () => void;
}

interface State {
  stage: Stage;
  inputValue: string;
}

interface ViewProps extends Props, State {
  handleChange: (e: React.SyntheticEvent<HTMLTextAreaElement>) => void;
}

export const SupportView = (props: ViewProps) => {
  const { inputValue, stage, handleChange, referenceNumber } = props;

  return (
    <Borders height="100%" width="100%">
      <WindowHeader>Contact Support</WindowHeader>
      {stage === Stage.Default && <SupportForm inputValue={inputValue} handleChange={handleChange} handleClose={noop} handleSubmit={noop} />}
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
    inputValue: '',
    stage: Stage.Default,
  };

  handleChange = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;

    this.setState({ inputValue: value });
  };

  render() {
    return <SupportView handleChange={this.handleChange} {...this.props} {...this.state} />;
  }
}

export default Support;
