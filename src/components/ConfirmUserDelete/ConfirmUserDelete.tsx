import * as React from 'react';

import { Button, ButtonLink, Copy, Error, Heading, Message, Row, Wrapper } from './ConfirmUserDelete.css';

import ROUTES from '../Router/const';

interface Props {
  deleteUser: Function;
  location: {
    state: {
      id: string;
      firstName: string;
      lastName: string;
    };
  };
}

interface State {
  deleteDisabled: boolean;
  responseContents: {
    firstName: string;
    lastName: string;
  };
  responseReceived: boolean;
  result: {
    message: string;
    status: string;
  };
}

class ConfirmUserDelete extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      deleteDisabled: false,
      responseContents: {
        firstName: '',
        lastName: '',
      },
      responseReceived: false,
      result: {
        message: '',
        status: '',
      },
    };
  }

  handleDeleteUser = () => {
    const { location } = this.props;
    const { firstName, lastName } = location.state;

    // simulate failure (uncomment to try, test when API is up)
    // this.setState({
    //   responseReceived: true,
    //   result: {
    //     message: 'Resource deletion failed.', // placeholder
    //     status: 'error', // placeholder
    //   },
    // });

    // simulate success
    this.setState({
      deleteDisabled: true,
      responseContents: {
        firstName,
        lastName,
      },
      responseReceived: true,
      result: {
        message: 'Resource deleted.', // placeholder
        status: 'success', // placeholder
      },
    });

    // DELETE on /api/admin/users/:id
    // Todo: hook up to API once endpoint is finalized
    // deleteUser()
  };

  renderResponse = result => {
    const { responseReceived, responseContents } = this.state;

    const { location } = this.props;
    const { firstName, lastName } = location.state;

    if (responseReceived) {
      if (result.status === 'error') {
        return <Error>There was an error trying to delete {`${firstName} ${lastName}`}. Please try again.</Error>;
      }
      if (responseContents.firstName && responseContents.lastName) {
        return <Message>Success! '{`${firstName} ${lastName}`}' was succesfully deleted.</Message>;
      }
    }
    return null;
  };

  render() {
    const { result, deleteDisabled } = this.state;
    const { location } = this.props;
    const { firstName, lastName } = location.state;

    return (
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

        {this.renderResponse(result)}
      </Wrapper>
    );
  }
}

export default ConfirmUserDelete;
