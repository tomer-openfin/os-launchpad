import * as React from 'react';

import { MetaWithCallbacks, ResponseStatus } from '../../types/commons';
import AdminConfirmationView from './AdminConfirmationView';

interface Props {
  cancelCtaText?: string;
  confirmationText: string;
  confirmCtaText?: string;
  errorMessage: string;
  headingText: string;
  height?: string;
  onConfirm: (meta: MetaWithCallbacks) => void;
  onConfirmSuccess: () => void;
  parentRoute: string;
  width?: string;
}

interface State {
  confirmButtonDisabled: boolean;
  responseReceived: boolean;
  result: {
    message?: string;
    status: string;
  };
}

const defaultState: State = {
  confirmButtonDisabled: false,
  responseReceived: false,
  result: {
    message: '',
    status: '',
  },
};

class AdminConfirmation extends React.Component<Props, State> {
  state: State = defaultState;

  onError = (callback?: () => void) => (message: string) =>
    this.setState(
      {
        responseReceived: true,
        result: {
          message,
          status: ResponseStatus.FAILURE,
        },
      },
      callback,
    );

  onSuccess = (callback: () => void) => () =>
    this.setState(
      {
        confirmButtonDisabled: true,
        responseReceived: true,
        result: {
          status: ResponseStatus.SUCCESS,
        },
      },
      callback,
    );

  handleConfirm = () => {
    const { onConfirm, onConfirmSuccess } = this.props;

    const meta = { successCb: this.onSuccess(onConfirmSuccess), errorCb: this.onError() };

    onConfirm(meta);
  };

  render() {
    const { cancelCtaText, confirmCtaText, confirmationText, errorMessage, headingText, height, parentRoute, width } = this.props;
    const { confirmButtonDisabled, responseReceived, result } = this.state;

    const errorText = responseReceived ? `${errorMessage}: ${result.message} Please try again.` : '';

    return (
      <AdminConfirmationView
        cancelCtaText={cancelCtaText}
        confirmationText={confirmationText}
        confirmButtonDisabled={confirmButtonDisabled}
        confirmCtaText={confirmCtaText}
        errorText={errorText}
        handleConfirm={this.handleConfirm}
        headingText={headingText}
        height={height}
        parentRoute={parentRoute}
        width={width}
      />
    );
  }
}

export default AdminConfirmation;
