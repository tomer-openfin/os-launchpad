import * as React from 'react';

import withResponseState, { PassedProps as ResponseProps } from '../../hocs/withResponseState';
import { MetaWithAsyncHandlers } from '../../types/commons';

import AdminConfirmationView from './AdminConfirmationView';

interface Props extends ResponseProps {
  cancelCtaText?: string;
  confirmationText: string;
  confirmCtaText?: string;
  errorMessage: string;
  handleCancel?: () => void;
  headingText: string;
  height?: string;
  onConfirm: (meta: MetaWithAsyncHandlers) => void;
  onConfirmSuccess: () => void;
  parentRoute?: string;
  width?: string;
}

interface State {
  confirmButtonDisabled: boolean;
}

const defaultState: State = {
  confirmButtonDisabled: false,
};

class AdminConfirmation extends React.Component<Props, State> {
  state: State = defaultState;

  onError = () =>
    this.setState({
      confirmButtonDisabled: false,
    });

  onSuccess = () =>
    this.setState(
      {
        confirmButtonDisabled: false,
      },
      this.props.onConfirmSuccess,
    );

  handleConfirm = () => {
    const { onConfirm, onResponseError, onResponseSuccess } = this.props;

    const meta = { onSuccess: onResponseSuccess(this.onSuccess), onFailure: onResponseError(this.onError) };

    this.setState(
      {
        confirmButtonDisabled: true,
      },
      () => onConfirm(meta),
    );
  };

  render() {
    const {
      handleCancel,
      cancelCtaText,
      confirmCtaText,
      confirmationText,
      errorMessage,
      headingText,
      height,
      responseError,
      responseMessage,
      width,
    } = this.props;
    const { confirmButtonDisabled } = this.state;

    const errorText = responseError ? `${errorMessage}: ${responseMessage} Please try again.` : '';

    return (
      <AdminConfirmationView
        cancelCtaText={cancelCtaText}
        confirmationText={confirmationText}
        confirmButtonDisabled={confirmButtonDisabled}
        confirmCtaText={confirmCtaText}
        errorText={errorText}
        handleCancel={handleCancel}
        handleConfirm={this.handleConfirm}
        headingText={headingText}
        height={height}
        width={width}
      />
    );
  }
}

export default withResponseState(AdminConfirmation);
