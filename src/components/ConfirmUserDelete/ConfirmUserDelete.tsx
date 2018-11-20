import * as React from 'react';

import { Button, ButtonLink, Copy, Error, Heading, Message, Row, Wrapper } from './';

import ROUTES from '../Router/const';

interface Props {
  deleteUser: Function;
  location: {
    state: {
      id: string;
      username: string;
    };
  };
}

interface State {
  deleteDisabled: boolean;
  responseContents: {
    username: string;
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
        username: '',
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
    const { id } = location.state;

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
        username: id,
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
    const { username } = location.state;

    if (responseReceived) {
      if (result.status === 'error') {
        return <Error>There was an error trying to delete {username}. Please try again.</Error>;
      }
      if (responseContents.username) {
        return <Message>Success! '{username}' was succesfully deleted.</Message>;
      }
    }
    return null;
  };

  render() {
    const { result, deleteDisabled } = this.state;
    const { location } = this.props;
    const { username } = location.state;

    return (
      <Wrapper>
        <Heading>Delete User</Heading>

        <Copy>Are you sure you want to delete {username}?</Copy>

        <Row>
          {deleteDisabled ? null : <Button onClick={this.handleDeleteUser}>Yes</Button>}

          <ButtonLink to={ROUTES.ADMIN_USERS}>Back</ButtonLink>
        </Row>

        {this.renderResponse(result)}
      </Wrapper>
    );
  }
}

export default ConfirmUserDelete;
