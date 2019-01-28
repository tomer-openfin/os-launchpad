import * as React from 'react';

import * as arrowIcon from '../../assets/ArrowCircle.svg';
import * as saveLayoutIcon from '../../assets/SaveLayout.svg';

import { Color } from '../../styles';
import { MetaWithCallbacks } from '../../types/commons';
import { ResponseStatus } from '../../types/enums';
import noop from '../../utils/noop';
import { isDevelopmentEnv } from '../../utils/processHelpers';
import { ArrowIcon, Input, InputWrapper, SaveIcon, SubmitButton, Text, TextWrapper, UndoText, UserActions } from './LayoutsUserActions.css';

interface Props {
  deleteLayout: (id: string) => void;
  saveLayout: (name: string, meta: MetaWithCallbacks) => void;
}

interface State {
  isSubmitting: boolean;
  layoutsUndoId: string;
  name: string;
  responseReceived: boolean;
  result: {
    message?: string;
    status: string;
  };
  showErrorState: boolean;
  showSavedState: boolean;
}

class LayoutsUserActions extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      isSubmitting: false,
      layoutsUndoId: '',
      name: '',
      responseReceived: false,
      result: {
        message: '',
        status: '',
      },
      showErrorState: true,
      showSavedState: true,
    };
  }

  errorCb = message => {
    this.setState({
      responseReceived: true,
      result: {
        message,
        status: ResponseStatus.FAILURE,
      },
    });
  };

  successCb = ({ id }) => {
    this.setState({
      layoutsUndoId: id,
      responseReceived: true,
      result: {
        status: ResponseStatus.SUCCESS,
      },
    });
  };

  handleDeleteClick = () => {
    const { layoutsUndoId } = this.state;
    const { deleteLayout } = this.props;

    if (layoutsUndoId) {
      deleteLayout(layoutsUndoId);

      this.setState({
        isSubmitting: false,
        responseReceived: false,
        result: {
          message: '',
          status: '',
        },
      });
    }
  };

  handleFormSubmit = e => {
    e.preventDefault();

    const { saveLayout } = this.props;
    const { name } = this.state;

    const meta = { successCb: this.successCb, errorCb: this.errorCb };

    this.setState(prevState => ({ isSubmitting: !prevState.isSubmitting, showErrorState: true, showSavedState: true }));
    saveLayout(name, meta);
  };

  handleNameChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const name = e.currentTarget.value;

    this.setState({ name });
  };

  renderActionsContent = () => {
    const { isSubmitting, responseReceived } = this.state;

    if (isSubmitting && !responseReceived) {
      return this.renderIsSubmitting();
    }

    if (!responseReceived) {
      return this.renderInputForm();
    }

    return this.renderMessage();
  };

  renderInputForm = () => (
    <InputWrapper onSubmit={this.handleFormSubmit}>
      <Input onChange={this.handleNameChange} placeholder="Layout Name" required type="text" />

      <SubmitButton type="submit">
        <ArrowIcon hoverColor={Color.JUPITER} size={14} imgSrc={arrowIcon} onClick={noop} />
      </SubmitButton>
    </InputWrapper>
  );

  renderIsSubmitting = () => (
    <TextWrapper>
      <Text>Submitting...</Text>
    </TextWrapper>
  );

  renderMessage = () => {
    const { responseReceived, result, showErrorState, showSavedState } = this.state;
    const ERROR_SHOW_DURATION_MS = 5000;
    const SUCCESS_SHOW_DURATION_MS = isDevelopmentEnv ? 2000 : 15000;

    if (responseReceived) {
      if (result.status === ResponseStatus.FAILURE) {
        setTimeout(
          () =>
            this.setState({
              isSubmitting: false,
              responseReceived: false,
              result: {
                message: '',
                status: '',
              },
              showErrorState: false,
            }),
          ERROR_SHOW_DURATION_MS,
        );

        return showErrorState && this.renderErrorMessage();
      }

      setTimeout(
        () =>
          this.setState({
            isSubmitting: false,
            responseReceived: false,
            result: {
              message: '',
              status: '',
            },
            showSavedState: false,
          }),
        SUCCESS_SHOW_DURATION_MS,
      );

      return showSavedState && this.renderSuccessMessage();
    }

    return null;
  };

  renderErrorMessage = () => (
    <TextWrapper>
      <Text>Error</Text>
    </TextWrapper>
  );

  renderSuccessMessage = () => (
    <TextWrapper>
      <Text>Saved</Text>

      <UndoText onClick={this.handleDeleteClick}>Undo</UndoText>
    </TextWrapper>
  );

  render() {
    const { result } = this.state;

    return (
      <UserActions>
        <SaveIcon
          validResult={result.status === ResponseStatus.SUCCESS || result.status === ResponseStatus.FAILURE}
          hoverColor={Color.JUPITER}
          size={24}
          imgSrc={saveLayoutIcon}
        />

        {this.renderActionsContent()}
      </UserActions>
    );
  }
}

export default LayoutsUserActions;
