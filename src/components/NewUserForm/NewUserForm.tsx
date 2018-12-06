import * as React from 'react';

import { ErrorMessage, Field, Form, Formik } from 'formik';

import { validateEmail, validatePhone, validateTextField } from '../../utils/validators';
import { ROUTES } from '../Router/consts';

import { ResponseStatus, User } from '../../types/commons';

import { Button, ButtonLink, Error, GridWrapper, Heading, Label, Message, Row, Wrapper } from './NewUserForm.css';

interface Props {
  createUser: Function;
}

interface State {
  formContents: User;
  responseReceived: boolean;
  result: {
    message?: string;
    status: string;
  };
  submitDisabled: boolean;
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
      organizationId: '',
      phone: '',
      tmpPassword: '',
      username: '',
    },
    responseReceived: false,
    result: {
      message: '',
      status: '',
    },
    submitDisabled: false,
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

  handleFormSubmit = (payload, actions) => {
    const { createUser } = this.props;

    const meta = { successCb: this.successCb, errorCb: this.errorCb };

    // default to +1 for country code for now
    payload.phone = `+1${payload.phone}`;

    createUser(payload, meta);

    actions.setSubmitting(false);
  };

  renderForm = ({ isSubmitting, isValid }) => {
    const { submitDisabled } = this.state;

    return (
      <Wrapper>
        <Heading>Create New User</Heading>

        <Form>
          <GridWrapper>
            <Label>
              Email
              <Field type="email" name="email" validate={validateEmail} />
              <ErrorMessage component={Error} name="email" />
            </Label>

            <Label>
              Phone Number
              <Field type="text" name="phone" maxLength="10" validate={validatePhone} />
              <ErrorMessage component={Error} name="phone" />
            </Label>

            {/* todo: add password validation rules based on what BE expects */}
            <Label>
              Password
              <Field type="password" name="tmpPassword" validate={validateTextField} />
              <ErrorMessage component={Error} name="tmpPassword" />
            </Label>

            <Label>
              First Name
              <Field type="text" name="firstName" validate={validateTextField} />
              <ErrorMessage component={Error} name="firstName" />
            </Label>

            <Label>
              Last Name
              <Field type="text" name="lastName" validate={validateTextField} />
              <ErrorMessage component={Error} name="lastName" />
            </Label>

            <Label>
              Middle Initial
              <Field type="text" name="middleInitial" />
              <ErrorMessage component={Error} name="middleInitial" />
            </Label>
          </GridWrapper>

          <Row>
            <ButtonLink to={ROUTES.ADMIN_USERS}>Cancel</ButtonLink>

            <Button type="submit" disabled={submitDisabled || isSubmitting || !isValid}>
              Submit
            </Button>
          </Row>
        </Form>

        {this.renderMessage()}
      </Wrapper>
    );
  };

  renderMessage = () => {
    const { responseReceived, result } = this.state;

    if (responseReceived) {
      if (result.status === ResponseStatus.FAILURE) {
        return <Error>Sorry, there was an error tyring to create this user, please try again. Error: {result.message}</Error>;
      }

      return <Message>Success! New user succesfully created.</Message>;
    }

    return null;
  };

  render() {
    const { formContents } = this.state;
    const { id, email, firstName, lastName, middleInitial, organizationId, tmpPassword, phone } = formContents;
    const { responseReceived, result } = this.state;

    return responseReceived && result.status === ResponseStatus.SUCCESS ? (
      <Wrapper>
        {this.renderMessage()}

        <ButtonLink to={ROUTES.ADMIN_USERS}>Continue</ButtonLink>
      </Wrapper>
    ) : (
      <Formik
        initialValues={{
          email,
          firstName,
          id,
          lastName,
          middleInitial,
          organizationId,
          phone,
          tmpPassword,
        }}
        onSubmit={this.handleFormSubmit}
        validateOnChange={false}
        render={this.renderForm}
      />
    );
  }
}

export default NewUserForm;
