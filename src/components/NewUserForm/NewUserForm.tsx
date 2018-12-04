import * as React from 'react';

import { ErrorMessage, Field, Form, Formik } from 'formik';

import { validateEmail, validateTextField } from '../../utils/validators';
import { ROUTES } from '../Router/consts';

import { ResponseStatus, User } from '../../types/commons';

import { Button, ButtonLink, Error, Heading, Label, Message, Row, Wrapper } from './NewUserForm.css';

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
      phoneNumber: '',
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

    createUser(payload, meta);

    actions.setSubmitting(false);
  };

  renderForm = ({ isSubmitting, isValid }) => {
    const { formContents, submitDisabled } = this.state;
    const { isAdmin } = formContents;

    return (
      <Wrapper>
        <Form>
          <Heading>Create New User</Heading>

          <Label>
            Email
            <Field type="email" name="email" validate={validateEmail} />
            <ErrorMessage component={Error} name="email" />
          </Label>

          {/* todo: add basic client-side phone validator */}
          <Label>
            Phone Number
            <Field type="text" name="phoneNumber" />
            <ErrorMessage component={Error} name="phoneNumber" />
          </Label>

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

          <Label>
            Make an administrator?
            <Field component="select" name="isAdmin" placeholder={isAdmin ? 'yes' : 'no'}>
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </Field>
          </Label>

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
        return <Error>There was an error tyring to create this user: {result.message}. Please try again.</Error>;
      }

      return <Message>Success! New user succesfully created.</Message>;
    }

    return null;
  };

  render() {
    const { formContents } = this.state;
    const { responseReceived, result } = this.state;
    const { id, email, firstName, isAdmin, lastName, middleInitial, organizationId, tmpPassword, phoneNumber } = formContents;

    return (
      responseReceived && result.status === ResponseStatus.SUCCESS ? (
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
            isAdmin,
            lastName,
            middleInitial,
            organizationId,
            phoneNumber,
            tmpPassword,
          }}
          onSubmit={this.handleFormSubmit}
          validateOnChange={false}
          render={this.renderForm}
        />
      )
    );
  }
}

export default NewUserForm;
