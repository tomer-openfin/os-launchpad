import { Formik } from 'formik';
import * as React from 'react';
import { Redirect } from 'react-router-dom';

import { Color } from '../../styles';
import UserForm, { ErrorResponseMessage, ErrorWrapper, Wrapper } from '../UserForm';

import { ResponseStatus, User } from '../../types/commons';

import { ROUTES } from '../Router/consts';

import WindowHeader from '../WindowHeader';

interface Props {
  createUser: Function;
  location;
}

interface State {
  formContents: User;
  isPasswordShown: boolean;
  responseReceived: boolean;
  result: {
    message?: string;
    status: string;
  };
}

class NewUserForm extends React.Component<Props, State> {
  state = {
    formContents: {
      email: '',
      firstName: '',
      id: '',
      isAdmin: false,
      lastName: '',
      middleInitial: '',
      phone: '',
      tmpPassword: '',
      username: '',
    },
    isPasswordShown: false,
    responseReceived: false,
    result: {
      message: '',
      status: '',
    },
  };

  errorCb = message => {
    this.setState({
      responseReceived: true,
      result: {
        message,
        status: ResponseStatus.FAILURE,
      },
    });
  };

  successCb = () =>
    this.setState({
      responseReceived: true,
      result: {
        status: ResponseStatus.SUCCESS,
      },
    });

  togglePasswordFieldType = () => {
    this.setState(prevState => ({ isPasswordShown: !prevState.isPasswordShown }));
  };

  handleFormSubmit = (payload, actions) => {
    const { createUser } = this.props;

    const meta = { successCb: this.successCb, errorCb: this.errorCb };

    // default to +1 for country code for now∏
    payload.phone = `+1${payload.phone}`;

    createUser(payload, meta);

    actions.setSubmitting(false);
  };

  renderMessage = () => {
    const { responseReceived, result } = this.state;

    if (responseReceived) {
      if (result.status === ResponseStatus.FAILURE) {
        return <ErrorResponseMessage>Sorry, there was an error trying to create this user, please try again. Error: {result.message}</ErrorResponseMessage>;
      }

      return <Redirect to={ROUTES.ADMIN_USERS} />;
    }

    return null;
  };

  renderForm = ({ isSubmitting, isValid }) => (
    <UserForm
      isSubmitting={isSubmitting}
      isValid={isValid}
      withPasswordField
      isPasswordShown={this.state.isPasswordShown}
      togglePasswordFieldType={this.togglePasswordFieldType}
    />
  );

  render() {
    const { formContents } = this.state;
    const { email, firstName, lastName, middleInitial, tmpPassword, phone } = formContents;

    return (
      <Wrapper>
        <WindowHeader backgroundColor={Color.VACUUM}>Create New User</WindowHeader>

        <Formik
          initialValues={{
            email,
            firstName,
            lastName,
            middleInitial,
            phone,
            tmpPassword,
          }}
          onSubmit={this.handleFormSubmit}
          validateOnChange={false}
          render={this.renderForm}
        />

        <ErrorWrapper>{this.renderMessage()}</ErrorWrapper>
      </Wrapper>
    );
  }
}

export default NewUserForm;
