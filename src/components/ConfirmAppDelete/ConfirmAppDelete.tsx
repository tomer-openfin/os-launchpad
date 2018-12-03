import * as React from 'react';

import { Button, ButtonLink, Copy, Error, Heading, Message, Row, Wrapper } from '../NewUserForm';

import { RESPONSE_FAILURE, RESPONSE_OK } from '../../services/ApiService';
import { App } from '../../types/commons';
import { ROUTES } from '../Router/consts';

interface Props {
  deleteApp: Function;
  location: {
    state: App;
  };
}

interface State {
  deleteDisabled: boolean;
  responseContents: {
    title: string;
  };
  responseReceived: boolean;
  result: {
    message?: string;
    status: string;
  };
}

class ConfirmAppDelete extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      deleteDisabled: false,
      responseContents: {
        title: '',
      },
      responseReceived: false,
      result: {
        message: '',
        status: '',
      },
    };
  }

  errorCb = message =>
    this.setState({
      responseReceived: true,
      result: {
        message,
        status: RESPONSE_FAILURE,
      },
    });

  successCb = () =>
    this.setState({
      deleteDisabled: true,
      responseReceived: true,
      result: {
        status: RESPONSE_OK,
      },
    });

  handleDeleteApp = () => {
    const { location, deleteApp } = this.props;

    const meta = { successCb: this.successCb, errorCb: this.errorCb };

    deleteApp(location.state, meta);
  };

  renderMessage = () => {
    const { responseReceived, result } = this.state;
    const { location } = this.props;
    const { title } = location.state;

    if (responseReceived) {
      if (result.status === RESPONSE_FAILURE) {
        return <Error>There was an error trying to delete {title}. Please try again.</Error>;
      }
      return <Message>Success! '{title}' was succesfully deleted.</Message>;
    }

    return null;
  };

  render() {
    const { deleteDisabled, responseReceived, result } = this.state;
    const { location } = this.props;
    const { title } = location.state;

    return (
      responseReceived && result.status === RESPONSE_OK ? (
        <Wrapper>
          {this.renderMessage()}

          <ButtonLink to={ROUTES.ADMIN_APPS}>Continue</ButtonLink>
        </Wrapper>
      ) : (
        <Wrapper>
          <Heading>Delete App</Heading>

          <Copy>Are you sure you want to delete {title} from your App Directory?</Copy>

          <Row>
            <ButtonLink to={ROUTES.ADMIN_APPS}>Cancel</ButtonLink>

            <Button disabled={deleteDisabled} onClick={this.handleDeleteApp}>
              Delete App
            </Button>
          </Row>

          {this.renderMessage()}
        </Wrapper>
      )
    );
  }
}

export default ConfirmAppDelete;
