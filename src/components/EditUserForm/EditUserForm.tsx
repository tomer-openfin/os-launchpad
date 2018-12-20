import { ErrorMessage, Field, Formik } from 'formik';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import * as trashIcon from '../../assets/Trash.svg';

import { Color } from '../../styles';
import { ResponseStatus, User } from '../../types/commons';
import { validatePhone, validateTextField } from '../../utils/validators';
import Button, { ButtonLink } from '../Button/Button.css';

import { ButtonWrapper, HeadingText } from '../ConfirmUserDelete/ConfirmDelete.css';
import { Footer } from '../NewAppForm/AppForms.css';
import { DeleteIcon, Error, FormWrapper, GridWrapper, Label, LabelText, Message, MiniGridWrapper, ScrollWrapper, Wrapper } from '../NewUserForm/UserForms.css';
import { ROUTES } from '../Router/consts';
import WindowHeader from '../WindowHeader/index';

interface Props {
  updateUser: Function;
  history;
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

class EditUserForm extends React.Component<Props & RouteComponentProps, State> {
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

  handleDeleteIconClick = () => {
    const { history, location } = this.props;

    history.push(ROUTES.ADMIN_USERS_DELETE, location.state);
  };

  renderForm = ({ isSubmitting, isValid }) => {
    const { saveDisabled } = this.state;
    const { location } = this.props;
    const { email, firstName, lastName } = location.state;

    return (
      <FormWrapper>
        <WindowHeader backgroundColor={Color.VACUUM} justifyContent="flex-start" withoutClose>
          <HeadingText>{`${firstName} ${lastName}`}</HeadingText>

          <DeleteIcon size={30} imgSrc={trashIcon} onClick={this.handleDeleteIconClick} />
        </WindowHeader>

        <ScrollWrapper>
          <GridWrapper>
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

              <Field type="text" name="email" disabled placeholder={email} />
            </Label>
          </GridWrapper>
        </ScrollWrapper>

        <Footer>
          <ButtonWrapper>
            <ButtonLink to={ROUTES.ADMIN_USERS} backgroundColor={Color.MERCURY} type="button" width={128}>
              Cancel
            </ButtonLink>

            <Button type="submit" width={128} disabled={saveDisabled || isSubmitting || !isValid}>
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

        <ButtonLink to={ROUTES.ADMIN_USERS} backgroundColor={Color.MERCURY} type="button" width={128}>
          Continue
        </ButtonLink>
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
