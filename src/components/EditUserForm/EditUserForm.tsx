import { Formik } from 'formik';
import * as React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import * as trashIcon from '../../assets/Trash.svg';

import { ResponseStatus, User } from '../../types/commons';

import { ROUTES } from '../Router/consts';

import { Color } from '../../styles';
import { HeadingText } from '../ConfirmUserDelete/ConfirmDelete.css';
import UserForm, { ErrorResponseMessage, ErrorWrapper, Wrapper } from '../UserForm';

import noop from '../../utils/noop';
import SvgIcon from '../SvgIcon/SvgIcon';
import WindowHeader from '../WindowHeader';

interface Props extends RouteComponentProps {
  updateUser: Function;
}

interface State {
  formContents: User;
  responseReceived: boolean;
  result: {
    message?: string;
    status: string;
  };
}

const defaultProps: Partial<Props> = {};

class EditUserForm extends React.Component<Props, State> {
  static defaultProps = defaultProps;

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

  renderMessage = () => {
    const { responseReceived, result } = this.state;

    if (responseReceived) {
      if (result.status === ResponseStatus.FAILURE) {
        return <ErrorResponseMessage>Sorry, there was an error tyring to update this user, please try again. Error: {result.message}</ErrorResponseMessage>;
      }

      return <Redirect to={ROUTES.ADMIN_USERS} />;
    }

    return null;
  };

  render() {
    const { location } = this.props;
    const { firstName, lastName, middleInitial, phone, id, username, email } = location.state;

    return (
      <Wrapper>
        <WindowHeader backgroundColor={Color.VACUUM} withoutClose>
          <HeadingText>{`${firstName} ${lastName}`}</HeadingText>

          <SvgIcon color={Color.MERCURY} hoverColor={Color.MARS} size={30} imgSrc={trashIcon} onClick={this.handleDeleteIconClick} />
        </WindowHeader>

        <Formik
          initialValues={{
            email,
            firstName,
            id,
            lastName,
            middleInitial,
            phone: phone ? phone.slice(2) : undefined,
            username,
          }}
          onSubmit={this.handleFormSubmit}
          validateOnChange={false}
          render={UserForm}
        />

        <ErrorWrapper>{this.renderMessage()}</ErrorWrapper>
      </Wrapper>
    );
  }
}

export default EditUserForm;
