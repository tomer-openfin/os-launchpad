import * as React from 'react';

import { PassedProps as ResponseProps } from '../../hocs/withResponseState';
import { UpdatePasswordRequestPayload } from '../../redux/me/types';
import { DispatchRequest } from '../../types/commons';

import { Wrapper } from './UpdatePasswordForm.css';

import ConfirmPasswordUpdate from '../ConfirmPasswordUpdate';
import FormWindow from '../FormWindow';
import PasswordFormik, { Values } from '../PasswordForm';

interface Props extends ResponseProps {
  handleCancel: () => void;
  handleConfirm: () => void;
  handleSuccess: () => void;
  updatePassword: DispatchRequest<UpdatePasswordRequestPayload>;
}

interface State {
  showPasswordForm: boolean;
}

const defaultState: State = { showPasswordForm: true };

class UpdatePasswordForm extends React.Component<Props, State> {
  state = defaultState;

  onSubmitSuccess = () => {
    const { handleConfirm } = this.props;

    this.setState(
      {
        showPasswordForm: false,
      },
      handleConfirm,
    );
  };

  handleSubmitValues = (formData: Values): Promise<void> => {
    const { updatePassword, onResponseError, onResponseSuccess } = this.props;

    const { confirmPassword, ...newAndOldPassword } = formData;

    return new Promise(resolve => {
      updatePassword(newAndOldPassword, {
        onFailure: onResponseError(resolve),
        onSuccess: onResponseSuccess(() => {
          this.onSubmitSuccess();
          resolve();
        }),
      });
    });
  };

  render() {
    const { handleCancel, handleSuccess, resetResponseError, responseError, responseMessage } = this.props;
    const { showPasswordForm } = this.state;

    return (
      <Wrapper height={showPasswordForm ? '421px' : '277px'}>
        {showPasswordForm ? (
          <FormWindow
            headingText="UpdatePassword"
            message={`Sorry, there was an error trying to update your password: ${responseMessage} Please try again.`}
            resetResponseError={resetResponseError}
            responseError={responseError}
          >
            <PasswordFormik handleCancel={handleCancel} handleSubmitValues={this.handleSubmitValues} />
          </FormWindow>
        ) : (
          <ConfirmPasswordUpdate handleSuccess={handleSuccess} />
        )}
      </Wrapper>
    );
  }
}

export default UpdatePasswordForm;
