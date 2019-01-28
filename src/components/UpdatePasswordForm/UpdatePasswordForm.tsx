import { Formik } from 'formik';
import * as React from 'react';

import { Color } from '../../styles';
import Borders from '../Borders';
import PasswordForm from '../PasswordForm/PasswordForm';
import { ErrorResponseMessage, ErrorWrapper } from '../UserForm';
import WindowHeader from '../WindowHeader';
import { Wrapper } from './UpdatePasswordForm.css';

import { UpdatePasswordRequestPayload } from '../../redux/me/types';
import { ResponseStatus } from '../../types/commons';
import ConfirmPasswordUpdate from '../ConfirmPasswordUpdate/ConfirmPasswordUpdate';

interface Props {
  updatePassword: Function;
}

interface State {
  formContents: UpdatePasswordRequestPayload;
  responseReceived: boolean;
  result: {
    message?: string;
    status: string;
  };
  showPasswordForm: boolean;
}

class UpdatePasswordForm extends React.Component<Props, State> {
  state = {
    confirmPassword: '',
    formContents: {
      newPassword: '',
      password: '',
    },
    responseReceived: false,
    result: {
      message: '',
      status: '',
    },
    showPasswordForm: true,
  };

  errorCb = cb => message =>
    this.setState(
      {
        responseReceived: true,
        result: {
          message,
          status: ResponseStatus.FAILURE,
        },
      },
      cb(),
    );

  successCb = cb => () =>
    this.setState(
      {
        responseReceived: true,
        result: {
          status: ResponseStatus.SUCCESS,
        },
        showPasswordForm: false,
      },
      cb(),
    );

  handleFormSubmit = (payload, actions) => {
    const { updatePassword } = this.props;

    const meta = { successCb: this.successCb(() => actions.setSubmitting(false)), errorCb: this.errorCb(() => actions.setSubmitting(false)) };

    if (payload.newPassword !== payload.confirmPassword) {
      actions.setFieldError('confirmPassword', 'Your new password and confirmation password do not match.');
      actions.setSubmitting(false);
      return;
    }

    // remove unessesary field from payload
    // confirmPassword field only used to verify passwords match
    const payloadCopy = { ...payload };
    delete payloadCopy.confirmPassword;

    // submit POST request
    updatePassword(payloadCopy, meta);
  };

  renderMessage = () => {
    const { responseReceived, result } = this.state;

    if (responseReceived) {
      if (result.status === ResponseStatus.FAILURE) {
        return <ErrorResponseMessage>Sorry, there was an error trying to update your password, please try again. Error: {result.message}</ErrorResponseMessage>;
      }
    }

    return null;
  };

  renderPasswordForm = ({ isSubmitting, isValid }) => <PasswordForm isSubmitting={isSubmitting} isValid={isValid} />;

  renderPasswordFormWindow = () => {
    const { formContents, confirmPassword } = this.state;
    const { password, newPassword } = formContents;

    return (
      <Wrapper>
        <Borders height="100%" width="100%">
          <WindowHeader backgroundColor={Color.VACUUM}>Update Password</WindowHeader>

          <Formik
            initialValues={{
              confirmPassword,
              newPassword,
              password,
            }}
            onSubmit={this.handleFormSubmit}
            validateOnChange={true}
            render={this.renderPasswordForm}
          />

          <ErrorWrapper>{this.renderMessage()}</ErrorWrapper>
        </Borders>
      </Wrapper>
    );
  };

  render() {
    const { showPasswordForm } = this.state;

    return showPasswordForm ? this.renderPasswordFormWindow() : <ConfirmPasswordUpdate />;
  }
}

export default UpdatePasswordForm;
