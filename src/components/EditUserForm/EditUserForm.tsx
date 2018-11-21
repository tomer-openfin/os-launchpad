import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as React from 'react';

import { validateEmail, validateTextField } from '../../utils/validators';
import ROUTES from '../Router/const';
import { Button, ButtonLink, Error, Heading, Label, Message, Row, Wrapper } from './EditUserForm.css';

interface ResponseContents {
  email: string;
  firstName: string;
  isAdmin: boolean;
  lastName: string;
  middleInitial?: string;
  organizationId: string;
  password: string;
  username: string;
}

interface Result {
  message: string;
  status: string;
}

interface Props {
  updateUser: Function;
  location: {
    state: {
      email: string;
      firstName: string;
      lastName: string;
      middleInitial?: string;
      username: string;
      isAdmin: boolean;
    };
  };
}

interface State {
  responseContents: ResponseContents;
  responseReceived: boolean;
  result: Result;
}

class EditUserForm extends React.Component<Props, State> {
  state = {
    responseContents: {
      email: '',
      firstName: '',
      isAdmin: false,
      lastName: '',
      middleInitial: '',
      organizationId: '',
      password: '',
      username: '',
    },
    responseReceived: false,
    result: {
      message: '',
      status: '',
    },
  };

  renderResponse = result => {
    const { responseReceived, responseContents } = this.state;
    if (responseReceived) {
      if (result.status === 'error') {
        return <Error>Error: {result.message}</Error>;
      }
      if (responseContents.username) {
        return <Message>Success! User '{responseContents.username}' was succesfully updated.</Message>;
      }
    }
    return null;
  };

  render() {
    const { result } = this.state;

    const { updateUser, location } = this.props;

    const { email, firstName, isAdmin, lastName, middleInitial, username } = location.state;

    // tslint:disable:jsx-no-multiline-js
    // tslint:disable:jsx-no-lambda
    return (
      <Formik
        initialValues={{
          email,
          firstName,
          isAdmin,
          lastName,
          middleInitial,
          username,
        }}
        onSubmit={(inputValues, actions) => {
          // PUT on /users
          updateUser(undefined, 'PUT', inputValues, undefined)
            .then(response => {
              // 400 received
              if (response.status === 'error') {
                this.setState({
                  responseReceived: true,
                  result: {
                    message: response.message,
                    status: response.status,
                  },
                });
              }

              // 200 received
              return this.setState({
                responseContents: response,
                responseReceived: true,
              });
            })
            .catch(err => console.log('error in EditUserForm:', err));

          actions.setSubmitting(false);
        }}
        validateOnChange={false}
        render={({ isSubmitting, isValid }) => (
          <Wrapper>
            {this.renderResponse(result)}

            <Form>
              <Heading>Edit User Details</Heading>

              <Label>
                Email:
                <Field type="email" name="email" validate={validateEmail} />
                <ErrorMessage component={Error} name="email" />
              </Label>

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
                Username:
                <Field type="text" name="username" validate={validateTextField} />
                <ErrorMessage component={Error} name="username" />
              </Label>

              <Label>
                Is administrator?
                <Field component="select" name="isAdmin" placeholder={isAdmin ? 'yes' : 'no'}>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </Field>
              </Label>

              <Row>
                {/* todo: use handle close click handler instead of Link */}
                <ButtonLink to={ROUTES.ADMIN_USERS}>Cancel</ButtonLink>

                <Button type="submit" disabled={isSubmitting || !isValid}>
                  Save Updates
                </Button>
              </Row>
            </Form>
          </Wrapper>
        )}
      />
    );
  }
}

export default EditUserForm;
