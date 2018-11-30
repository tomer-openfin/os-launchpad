import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as React from 'react';

import { RESPONSE_FAILURE, RESPONSE_OK } from '../../services/ApiService';
import { User } from '../../types/commons';
import { validateTextField } from '../../utils/validators';
import { Button, ButtonLink, Error, Heading, Label, Message, Row, Wrapper } from '../NewUserForm';
import { ROUTES } from '../Router/consts';

interface Props {
  updateUser: Function;
  location: {
    state: User;
  };
}

interface State {
  formContents: User;
  responseReceived: boolean;
  result: {
    message?: string;
    status: string;
  };
  saveDisabled: boolean;
}

class EditUserForm extends React.Component<Props, State> {
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
    saveDisabled: false,
  };

  errorCb = message =>
    this.setState({
      responseReceived: true,
      result: {
        message,
        status: RESPONSE_FAILURE,
      },
    });

  successCb = () =>
    this.setState({
      responseReceived: true,
      result: {
        status: RESPONSE_OK,
      },
      saveDisabled: true,
    });

  handleFormSubmit = (payload, actions) => {
    const { updateUser } = this.props;

    const meta = { successCb: this.successCb, errorCb: this.errorCb };

    updateUser(payload, meta);

    actions.setSubmitting(false);
  };

  renderForm = ({ isSubmitting, isValid }) => {
    const { location } = this.props;
    const { email, isAdmin } = location.state;

    return (
      <Wrapper>
        <Form>
          <Heading>Edit User Details</Heading>

          <Label>Email: {email}</Label>

          <Label>
            First Name:
            <Field type="text" name="firstName" validate={validateTextField} />
            <ErrorMessage component={Error} name="firstName" />
          </Label>

          <Label>
            Last Name:
            <Field type="text" name="lastName" validate={validateTextField} />
            <ErrorMessage component={Error} name="lastName" />
          </Label>

          <Label>
            Middle Initial:
            <Field type="text" name="middleInitial" />
            <ErrorMessage component={Error} name="middleInitial" />
          </Label>

          {/* todo: add basic client-side phone validator */}
          <Label>
            Phone Number:
            <Field type="text" name="phoneNumber" />
            <ErrorMessage component={Error} name="phoneNumber" />
          </Label>

          <Label>
            Is administrator?
            <Field component="select" name="isAdmin" placeholder={isAdmin ? 'yes' : 'no'}>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Field>
          </Label>

          <Row>
            <ButtonLink to={ROUTES.ADMIN_USERS}>Cancel</ButtonLink>

            <Button type="submit" disabled={isSubmitting || !isValid}>
              Save Updates
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
      if (result.status === RESPONSE_FAILURE) {
        return <Error>There was an error tyring to update this user: {result.message}. Please try again.</Error>;
      }

      return <Message>Success! This user was succesfully modified.</Message>;
    }

    return null;
  };

  render() {
    const { location } = this.props;
    const { responseReceived, result } = this.state;
    const { firstName, isAdmin, lastName, middleInitial, phoneNumber, id, username } = location.state;

    return (
      responseReceived && result.status === RESPONSE_OK ? (
          <Wrapper>
            {this.renderMessage()}

            <ButtonLink to={ROUTES.ADMIN_USERS}>Continue</ButtonLink>
          </Wrapper>
        ) : (
          <Formik
            initialValues={{
              firstName,
              id,
              isAdmin,
              lastName,
              middleInitial,
              phoneNumber,
              username,
            }}
            onSubmit={this.handleFormSubmit}
            validateOnChange={false}
            render={this.renderForm}
          />
      )
    );
  }
}

export default EditUserForm;
