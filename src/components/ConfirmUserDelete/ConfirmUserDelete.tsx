import * as React from 'react';

import { Button, ButtonLink, Copy, Error, Heading, Message, Row, Wrapper } from '../NewUserForm';

import { ResponseStatus, User } from '../../types/commons';
import { ROUTES } from '../Router/consts';

interface Props {
  deleteUser: Function;
  location: {
    state: User;
  };
}

interface State {
  deleteDisabled: boolean;
  responseReceived: boolean;
  result: {
    message?: string;
    status: string;
  };
}

class ConfirmUserDelete extends React.Component<Props, State> {
  state = {
    deleteDisabled: false,
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
      deleteDisabled: true,
      responseReceived: true,
      result: {
        status: ResponseStatus.SUCCESS,
      },
    });

  handleDeleteUser = () => {
    const { location, deleteUser } = this.props;

    const meta = { successCb: this.successCb, errorCb: this.errorCb };

    deleteUser(location.state, meta);
  };

  renderMessage = () => {
    const { responseReceived, result } = this.state;
    const { location } = this.props;
    const { firstName, lastName } = location.state;

    if (responseReceived) {
      if (result.status === ResponseStatus.FAILURE) {
        return (
          <Error>
            Sorry, there was an error trying to delete {`${firstName} ${lastName}`}, please try again. Error: {result.message}
          </Error>
        );
      }
      return <Message>Success! '{`${firstName} ${lastName}`}' was succesfully deleted.</Message>;
    }
    return null;
  };

  render() {
    const { location } = this.props;
    const { deleteDisabled, responseReceived, result } = this.state;
    const { firstName, lastName } = location.state;

    return responseReceived && result.status === ResponseStatus.SUCCESS ? (
      <Wrapper>
        {this.renderMessage()}

        <ButtonLink to={ROUTES.ADMIN_USERS}>Continue</ButtonLink>
      </Wrapper>
    ) : (
      <Wrapper>
        <Heading>Delete User</Heading>

        <Copy>
          You are about to delete the following user: {firstName} {lastName}?
        </Copy>

        <Row>
          <ButtonLink to={ROUTES.ADMIN_USERS}>Cancel</ButtonLink>

          <Button disabled={deleteDisabled} onClick={this.handleDeleteUser}>
            Delete User
          </Button>
        </Row>

        {this.renderMessage()}
      </Wrapper>
    );
  }
}

export default ConfirmUserDelete;
