import * as React from 'react';

import * as checkIcon from '../../assets/CheckCircle.svg';
import * as saveIcon from '../../assets/Save.svg';

import { Color } from '../../styles';
import { CheckIcon, Input, LayoutForm, SaveIcon, SubmitButton, Text, TextWrapper, UndoText, UserActions } from './LayoutsUserActions.css';

const ERROR_SHOW_DURATION_MS = 5000;
const SUCCESS_SHOW_DURATION_MS = 10000;

enum Stage {
  Default = 'default',
  Submitting = 'submitting',
  Saved = 'saved',
  Updated = 'updated',
  Error = 'error',
}

interface Props {
  dismissUndoLayout: () => void;
  saveLayout: (name: string, meta: { successCb: (updated: boolean) => void; errorCb: () => void }) => void;
  undoLayout: (meta: { successCb: () => void; errorCb: () => void }) => void;
}

interface State {
  name: string;
  stage: Stage;
}

class LayoutsUserActions extends React.Component<Props, State> {
  errorTimeout?: number;
  successTimeout?: number;

  constructor(props: Props) {
    super(props);

    this.state = {
      name: '',
      stage: Stage.Default,
    };
  }

  componentWillUnmount() {
    this.clearTimeouts();
  }

  clearTimeouts = () => {
    window.clearTimeout(this.errorTimeout);
    window.clearTimeout(this.successTimeout);
  };

  createSuccessTimeout = () => {
    this.clearTimeouts();

    this.successTimeout = window.setTimeout(this.resetForm, SUCCESS_SHOW_DURATION_MS);
  };

  errorCb = () => {
    this.setState({ stage: Stage.Error });
    this.errorTimeout = window.setTimeout(this.resetForm, ERROR_SHOW_DURATION_MS);
  };

  saveCb = (updated: boolean) => {
    if (updated) {
      this.setState({ stage: Stage.Updated });
    } else {
      this.setState({ stage: Stage.Saved });
    }

    this.createSuccessTimeout();
  };

  handleUndo = () => {
    const { undoLayout } = this.props;

    this.setState({ stage: Stage.Submitting });
    undoLayout({ errorCb: this.errorCb, successCb: this.resetForm });
  };

  handleFormSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { saveLayout } = this.props;
    const { name } = this.state;

    const meta = { successCb: this.saveCb, errorCb: this.errorCb };

    this.setState({ stage: Stage.Submitting });

    saveLayout(name.trim(), meta);
  };

  handleNameChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const name = e.currentTarget.value;

    this.setState({ name });
  };

  resetForm = () => {
    this.clearTimeouts();

    const { dismissUndoLayout } = this.props;

    dismissUndoLayout();

    this.setState({ stage: Stage.Default });
  };

  renderContent() {
    const { stage } = this.state;

    switch (stage) {
      case Stage.Error: {
        return this.renderMessage('Error');
      }
      case Stage.Submitting: {
        return this.renderMessage('Submitting...');
      }
      case Stage.Saved: {
        return this.renderMessage('Saved');
      }
      case Stage.Updated: {
        return this.renderMessage('Updated', true);
      }
      default: {
        return this.renderLayoutForm();
      }
    }
  }

  renderLayoutForm() {
    return (
      <LayoutForm onSubmit={this.handleFormSubmit}>
        <Input onChange={this.handleNameChange} placeholder="Workspace Name" required type="text" />

        <SubmitButton type="submit" disabled={!this.state.name.trim()}>
          <CheckIcon hoverColor={Color.JUPITER} imgSrc={checkIcon} size={14} />
        </SubmitButton>
      </LayoutForm>
    );
  }

  renderMessage(text: string, hasUndo?: boolean) {
    const { stage } = this.state;

    return (
      <TextWrapper>
        <Text onClick={stage !== Stage.Submitting ? this.resetForm : undefined}>{text}</Text>

        {hasUndo && (
          <UndoText onClick={this.handleUndo} onMouseEnter={this.clearTimeouts} onMouseMove={this.clearTimeouts} onMouseLeave={this.createSuccessTimeout}>
            Undo
          </UndoText>
        )}
      </TextWrapper>
    );
  }

  render() {
    const { stage } = this.state;

    return (
      <UserActions>
        <SaveIcon validResult={stage !== Stage.Default} hoverColor={Color.JUPITER} size={24} imgSrc={saveIcon} />

        {this.renderContent()}
      </UserActions>
    );
  }
}

export default LayoutsUserActions;
