import * as React from 'react';

import noop from '../../utils/noop';
import SupportForm from '../SupportForm';
import SupportFormConfirmation from '../SupportFormConfirmation';
import WindowHeader from '../WindowHeader';

const SUPPORT_EMAIL = 'support@openfin.co';
const SUCCESS_1 = 'Thank you, your support ticket has been submitted.';
const SUCCESS_2 = (ref: string | number = 'hello world') => `Your reference number is ${ref}.`;
const SUCCESS_3 = (email: string = SUPPORT_EMAIL) => `You may follow up with this ticket by contacting ${email}.`;
const FAIL_1 = 'Unfortunately, your support ticket could not be submitted.';
const FAIL_2 = (email: string = SUPPORT_EMAIL) => `Please contact ${email} to resolve your issue.`;

export enum Stage {
  Default = 'default',
  Success = 'success',
  Failure = 'failure',
}

interface Props {
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
  const { inputValue, stage, handleChange } = props;

  return (
    <>
      <WindowHeader>Contact Support</WindowHeader>
      {stage === Stage.Default && <SupportForm inputValue={inputValue} handleChange={handleChange} handleClose={noop} handleSubmit={noop} />}
      {stage === Stage.Success && (
        <SupportFormConfirmation handleClose={noop}>
          <p>{SUCCESS_1}</p>
          <p>{SUCCESS_2()}</p>
          <p>{SUCCESS_3()}</p>
        </SupportFormConfirmation>
      )}
      {stage === Stage.Failure && (
        <SupportFormConfirmation handleClose={noop}>
          <p>{FAIL_1}</p>
          <p>{FAIL_2()}</p>
        </SupportFormConfirmation>
      )}
    </>
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
    const { inputValue, stage } = this.state;

    return <SupportView handleChange={this.handleChange} {...this.props} {...this.state} />;
  }
}

export default Support;
