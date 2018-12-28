import { ErrorMessage, Field, Formik } from 'formik';
import * as React from 'react';

import * as passwordIcon from '../../assets/Eye.svg';

import { Footer } from '../NewAppForm/AppForms.css';
import {
  ButtonWrapper,
  Error,
  ErrorWrapper,
  FormWrapper,
  GridWrapper,
  IconWrapper,
  Label,
  LabelText,
  Message,
  MiniGridWrapper,
  PasswordIcon,
  ScrollWrapper,
  Wrapper,
} from './UserForms.css';

import { Color } from '../../styles';
import { ResponseStatus, User } from '../../types/commons';
import { validateEmail, validatePhone, validateTextField } from '../../utils/validators';
import Button, { ButtonLink } from '../Button/Button.css';
import { ROUTES } from '../Router/consts';
import WindowHeader from '../WindowHeader/index';

interface Props {
  createUser: Function;
  location;
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
      <FormWrapper>
        <WindowHeader backgroundColor={Color.VACUUM} withoutClose>
          Create New User
        </WindowHeader>

        <ScrollWrapper>
          <GridWrapper hasPasswordField>
            <MiniGridWrapper>
              <Label>
                <LabelText>First Name</LabelText>

                <Field type="text" name="firstName" validate={validateTextField} placeholder="Enter first name" />

                <ErrorMessage component={Error} name="firstName" />
              </Label>

              <Label>
                <LabelText>MI</LabelText>

                <Field type="text" name="middleInitial" />

                <ErrorMessage component={Error} name="middleInitial" />
              </Label>
            </MiniGridWrapper>

            <Label>
              <LabelText>Last Name</LabelText>

              <Field type="text" name="lastName" validate={validateTextField} placeholder="Enter last name" />

              <ErrorMessage component={Error} name="lastName" />
            </Label>

            <Label>
              <LabelText>Phone Number</LabelText>

              <Field type="text" name="phone" maxLength="10" validate={validatePhone} placeholder="Enter phone number" />

              <ErrorMessage component={Error} name="phone" />
            </Label>

            <Label>
              <LabelText>Email</LabelText>

              <Field type="email" name="email" validate={validateEmail} placeholder="Enter email" />

              <ErrorMessage component={Error} name="email" />
            </Label>

            {/* todo: add password validation rules based on what BE expects */}
            <Label>
              <LabelText>Password</LabelText>

              <Field type="password" name="tmpPassword" validate={validateTextField} placeholder="Enter password" />
              <IconWrapper>
                <PasswordIcon imgSrc={passwordIcon} size={25} />
              </IconWrapper>

              <ErrorMessage component={Error} name="tmpPassword" />
            </Label>
          </GridWrapper>
        </ScrollWrapper>

        <Footer>
          <ButtonWrapper>
            <ButtonLink to={ROUTES.ADMIN_USERS} backgroundColor={Color.MERCURY} type="button" width={128}>
              Cancel
            </ButtonLink>

            <Button type="submit" width={128} disabled={submitDisabled || isSubmitting || !isValid}>
              Save
            </Button>
          </ButtonWrapper>
        </Footer>

        {this.renderMessage()}
      </FormWrapper>
    );
  };

  renderMessage = () => {
    const { responseReceived, result } = this.state;

    if (responseReceived) {
      if (result.status === ResponseStatus.FAILURE) {
        return (
          <ErrorWrapper>
            <Error>Sorry, there was an error trying to create this user, please try again. Error: {result.message}</Error>
          </ErrorWrapper>
        );
      }

      return <Message>Success! New user succesfully created.</Message>;
    }

    return null;
  };

  render() {
    const { formContents } = this.state;
    const { email, firstName, lastName, middleInitial, tmpPassword, phone } = formContents;
    const { responseReceived, result } = this.state;

    return responseReceived && result.status === ResponseStatus.SUCCESS ? (
      <Wrapper>
        {this.renderMessage()}

        <ButtonLink to={ROUTES.ADMIN_USERS} backgroundColor={Color.MERCURY} type="button" width={128}>
          Continue
        </ButtonLink>
      </Wrapper>
    ) : (
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
    );
  }
}

export default NewUserForm;
