import * as React from 'react';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Link } from 'react-router-dom';

import { validateEmail, validateTextField } from '../../utils/validators';
import ROUTES from '../Router/const';
import { Button, ButtonLink, Error, Heading, Label, Message, Row, Wrapper } from './NewUserForm.css';

interface Result {
  status: string;
  message: string;
}

interface FormContents {
  email: string;
  firstName: string;
  isAdmin: boolean;
  lastName: string;
  middleInitial?: string;
  organizationId: string;
  password: string;
  username: string;
}

interface Props {
  createUser: Function;
  existingEmailsList?: string[];
}

interface State {
  formContents: FormContents;
  formSubmitted: boolean;
  result: Result;
}

class NewUserForm extends React.Component<Props, State> {
  state = {
    formContents: {
      email: '',
      firstName: '',
      isAdmin: false,
      lastName: '',
      middleInitial: '',
      organizationId: '',
      password: '',
      username: '',
    },
    formSubmitted: false,
    result: {
      message: '',
      status: '',
    },
  };

  renderMessage = result => {
    const { formSubmitted, formContents } = this.state;

    if (formSubmitted) {
      if (result.status === 'error') {
        return <Error>Error: {result.message}</Error>;
      }

      if (formContents.username) {
        return <Message>Success! User '{formContents.username}' succesfully created.</Message>;
      }
    }

    return null;
  };

  render() {
    const { createUser } = this.props;

    const {
      result,
      formContents: { email, firstName, isAdmin, lastName, middleInitial, organizationId, password, username },
    } = this.state;

    // tslint:disable:jsx-no-lambda
    return (
      <Formik
        initialValues={{
          email,
          firstName,
          isAdmin,
          lastName,
          middleInitial,
          organizationId,
          password,
          username,
        }}
        onSubmit={(inputValues, actions) => {
          // POST to /api/admin/users
          createUser(undefined, 'POST', inputValues, undefined)
            .then(response => {
              if (response.status === 'error') {
                return this.setState({
                  formSubmitted: true,
                  result: {
                    message: response.message,
                    status: response.status,
                  },
                });
              }

              // 200 received
              return this.setState({ formContents: response, formSubmitted: true });
            })
            /* tslint:disable:no-console */
            .catch(err => console.log('error in createUser:', err));

          actions.setSubmitting(false);
        }}
        validateOnChange={false}
        render={({ isSubmitting, isValid }) => (
          <Wrapper>
            {this.renderMessage(result)}

            <Form>
              <Heading>Create New User</Heading>

              <Label>
                Username:
                <Field type="text" name="username" validate={validateTextField} />
                <ErrorMessage component={Error} name="username" />
              </Label>

              <Label>
                Email:
                <Field type="email" name="email" validate={validateEmail} />
                <ErrorMessage component={Error} name="email" />
              </Label>

              <Label>
                Password:
                <Field type="password" name="password" validate={validateTextField} />
                <ErrorMessage component={Error} name="password" />
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
                Make an administrator?
                <Field component="select" name="isAdmin" placeholder={isAdmin ? 'yes' : 'no'}>
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </Field>
              </Label>

              <Row>
                <Button type="submit" disabled={isSubmitting || !isValid}>
                  Submit
                </Button>

                <ButtonLink to={ROUTES.ADMIN_USERS}>Back</ButtonLink>
              </Row>
            </Form>
          </Wrapper>
        )}
      />
    );
  }
}

export default NewUserForm;
