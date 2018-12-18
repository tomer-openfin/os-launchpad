import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as React from 'react';

import { ResponseStatus, User } from '../../types/commons';
import { validatePhone, validateTextField } from '../../utils/validators';
import { Button, ButtonLink, Error, GridWrapper, Heading, Label, Message, Row, Wrapper } from '../NewUserForm';
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
      phone: '',
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
        status: ResponseStatus.FAILURE,
      },
    });

  successCb = () =>
    this.setState({
      responseReceived: true,
      result: {
        status: ResponseStatus.SUCCESS,
      },
      saveDisabled: true,
    });

  handleFormSubmit = (payload, actions) => {
    const { updateUser } = this.props;

    const meta = { successCb: this.successCb, errorCb: this.errorCb };

    // default to +1 for country code for now
    payload.phone = `+1${payload.phone}`;

    updateUser(payload, meta);

    actions.setSubmitting(false);
  };

  renderForm = ({ isSubmitting, isValid }) => {
    const { location } = this.props;
    const { email } = location.state;

    return (
      <Wrapper>
        <Heading>Edit User Details</Heading>

        <Label>Email: {email}</Label>

        <Form>
          <GridWrapper>
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

            <Label>
              Phone Number:
              <Field type="text" name="phone" maxLength="10" validate={validatePhone} />
              <ErrorMessage component={Error} name="phone" />
            </Label>
          </GridWrapper>

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
      if (result.status === ResponseStatus.FAILURE) {
        return <Error>Sorry, there was an error tyring to update this user, please try again. Error: {result.message}</Error>;
      }

      return <Message>Success! This user was succesfully modified.</Message>;
    }

    return null;
  };

  render() {
    const { location } = this.props;
    const { responseReceived, result } = this.state;
    const { firstName, lastName, middleInitial, phone, id, username } = location.state;

    return responseReceived && result.status === ResponseStatus.SUCCESS ? (
      <Wrapper>
        {this.renderMessage()}

        <ButtonLink to={ROUTES.ADMIN_USERS}>Continue</ButtonLink>
      </Wrapper>
    ) : (
      <Formik
        initialValues={{
          firstName,
          id,
          lastName,
          middleInitial,
          phone: phone!.slice(2),
          username,
        }}
        onSubmit={this.handleFormSubmit}
        validateOnChange={false}
        render={this.renderForm}
      />
    );
  }
}

export default EditUserForm;
