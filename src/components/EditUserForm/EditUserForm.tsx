// tslint:disable:no-console
import * as React from 'react';

import { ErrorMessage, Field, Form, Formik } from 'formik';

import { ErrorResponse, Response, StyledButton, StyledError, StyledLabel, StyledWrapper } from './EditUserForm.css';

import noop from '../../utils/noop';

interface CurrentUserData {
  email: string;
  firstName: string;
  lastName: string;
  middleInitial?: string;
  username: string;
  isAdmin: boolean;
}

interface ResponseContents extends CurrentUserData {
  password: string;
  organizationId: string;
}

interface Result {
  message: string;
  status: string;
}

interface Props {
  updateUser: Function;
  currentUserData: CurrentUserData;
}

interface State {
  responseContents: ResponseContents;
  responseReceived: boolean;
  result: Result;
}

// extract validation utilities to seperate file OR decide if want to use YUP library
const validateEmail = value => {
  let error;

  // temp regex email validation, using RegExp Constructor to avoid max-line 160
  const EMAIL_REGEXP = new RegExp(
    [
      '^(([^<>()[\\]\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\.,;:\\s@"]+)*)',
      '|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.',
      '[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+',
      '[a-zA-Z]{2,}))$',
    ].join(''),
  );

  if (!value) {
    error = 'Email Input Field Required';
  } else if (!EMAIL_REGEXP.test(value)) {
    error = 'Invalid Email format';
  }
  return error;
};

const validateTextField = value => {
  let error;

  if (!value) {
    error = 'Input Field Required';
  }

  return error;
};

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
        return <ErrorResponse>Error: {result.message}</ErrorResponse>;
      }
      if (responseContents.username) {
        return <Response>Success! User '{responseContents.username}' was succesfully updated.</Response>;
      }
    }
    return null;
  };

  render() {
    const { result } = this.state;

    const {
      updateUser,
      currentUserData: { email, firstName, isAdmin, lastName, middleInitial, username },
    } = this.props;

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
          updateUser(inputValues)
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
          <StyledWrapper>
            {/* placeholder until admin flow is determined */}
            {this.renderResponse(result)}

            <Form>
              <h3>Edit User Details</h3>

              <StyledLabel>
                Email:
                <Field type="email" name="email" validate={validateEmail} />
                <ErrorMessage component={StyledError} name="email" />
              </StyledLabel>

              <StyledLabel>
                First Name:
                <Field type="text" name="firstName" validate={validateTextField} />
                <ErrorMessage component={StyledError} name="firstName" />
              </StyledLabel>

              <StyledLabel>
                Last Name:
                <Field type="text" name="lastName" validate={validateTextField} />
                <ErrorMessage component={StyledError} name="lastName" />
              </StyledLabel>

              <StyledLabel>
                Middle Initial:
                <Field type="text" name="middleInitial" />
                <ErrorMessage component={StyledError} name="middleInitial" />
              </StyledLabel>

              <StyledLabel>
                Username:
                <Field type="text" name="username" validate={validateTextField} />
                <ErrorMessage component={StyledError} name="username" />
              </StyledLabel>

              <StyledLabel>
                Is administrator?
                <Field component="select" name="isAdmin" placeholder={isAdmin ? 'yes' : 'no'}>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </Field>
              </StyledLabel>

              <StyledButton type="submit" disabled={isSubmitting || !isValid}>
                Submit
              </StyledButton>

              <StyledButton type="button" onClick={noop}>
                Exit
              </StyledButton>
            </Form>
          </StyledWrapper>
        )}
      />
    );
  }
}

export default EditUserForm;
