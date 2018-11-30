import * as React from 'react';

import { Button, ButtonLink, Copy, Error, Heading, Message, Row, Wrapper } from '../NewUserForm';

import ApiService from '../../services/ApiService';
import { ROUTES } from '../Router/consts';

interface Props {
  deleteApp: Function;
  location: {
    state: {
      id: string;
      title: string;
    };
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

const RESPONSE_OK = 'ok';
const RESPONSE_ERROR = 'error';

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

  handleDeleteApp = () => {
    const { location } = this.props;
    const { id } = location.state;

    ApiService.deleteAdminApp(id)
      .then(resp => {
        if (resp.status === RESPONSE_OK) {
          this.setState({
            deleteDisabled: true,
            responseContents: {
              title: id,
            },
            responseReceived: true,
            result: {
              status: RESPONSE_OK,
            },
          });
        }

        this.setState({
          responseReceived: true,
          result: {
            status: RESPONSE_ERROR,
          },
        });
      })
      .catch(err => {
        // temp force failure flow message
        this.setState({ responseReceived: true, result: { status: RESPONSE_ERROR } });

        // tslint:disable-next-line:no-console
        console.log('There was an error with the API for deleteApp:', err);
      });
  };

  renderResponse = result => {
    const { responseReceived } = this.state;

    const { location } = this.props;
    const { title } = location.state;

    if (responseReceived) {
      if (result.status === RESPONSE_OK) {
        return <Message>Success! '{title}' was succesfully deleted.</Message>;
      }
      return <Error>There was an error trying to delete {title}. Please try again.</Error>;
    }

    return null;
  };

  render() {
    const { result, deleteDisabled } = this.state;
    const { location } = this.props;
    const { title } = location.state;

    return (
      <Wrapper>
        <Heading>Delete App</Heading>

        <Copy>Are you sure you want to delete {title} from your App Directory?</Copy>

        <Row>
          <ButtonLink to={ROUTES.ADMIN_APPS}>Cancel</ButtonLink>

          <Button disabled={deleteDisabled} onClick={this.handleDeleteApp}>
            Delete App
          </Button>
        </Row>

        {this.renderResponse(result)}
      </Wrapper>
    );
  }
}

export default ConfirmAppDelete;
