import * as React from 'react';
import { Redirect } from 'react-router-dom';

import Button, { ButtonLink } from '../Button';
import { ButtonWrapper, Copy, CopyWrapper, Error, Heading, HeadingText, Wrapper } from './ConfirmDelete.css';

import { Color } from '../../styles';
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
      return <Redirect to={ROUTES.ADMIN_USERS} />;
    }
    return null;
  };

  render() {
    const { location } = this.props;
    const { deleteDisabled } = this.state;
    const { firstName, lastName } = location.state;

    return (
      <Wrapper>
        <Heading>
          <HeadingText>Are you sure?</HeadingText>
        </Heading>

        <CopyWrapper>
          <Copy>You are about to delete the following user:</Copy>

          <Copy>{`\n ${firstName} ${lastName}`}</Copy>
        </CopyWrapper>

        <ButtonWrapper>
          <ButtonLink to={ROUTES.ADMIN_USERS} backgroundColor={Color.MERCURY} type="button" width={153}>
            Cancel
          </ButtonLink>

          <Button width={153} disabled={deleteDisabled} onClick={this.handleDeleteUser}>
            Delete
          </Button>
        </ButtonWrapper>

        {this.renderMessage()}
      </Wrapper>
    );
  }
}

export default ConfirmUserDelete;
