import * as React from 'react';

import Button, { ButtonLink } from '../Button/Button.css';
import { ButtonWrapper, Copy, CopyWrapper, Error, Heading, HeadingText, Message, Wrapper } from '../ConfirmUserDelete/ConfirmDelete.css';

import { Color } from '../../styles/index';
import { App, ResponseStatus } from '../../types/commons';
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
      if (result.status === ResponseStatus.FAILURE) {
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

    return responseReceived && result.status === ResponseStatus.SUCCESS ? (
      <Wrapper>
        {this.renderMessage()}

        <ButtonLink to={ROUTES.ADMIN_APPS} backgroundColor={Color.MERCURY} type="button" width={153}>
          Continue
        </ButtonLink>
      </Wrapper>
    ) : (
      <Wrapper>
        <Heading>
          <HeadingText>Delete App?</HeadingText>
        </Heading>

        <CopyWrapper>
          <Copy>Are you sure you want to delete the app:</Copy>
          <Copy>{`\n ${title}?`}</Copy>
        </CopyWrapper>

        <ButtonWrapper>
          <ButtonLink to={ROUTES.ADMIN_APPS} backgroundColor={Color.MERCURY} type="button" width={153}>
            Cancel
          </ButtonLink>

          <Button width={153} disabled={deleteDisabled} onClick={this.handleDeleteApp}>
            Delete
          </Button>
        </ButtonWrapper>

        {this.renderMessage()}
      </Wrapper>
    );
  }
}

export default ConfirmAppDelete;
