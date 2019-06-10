import * as React from 'react';

import * as checkIcon from '../../assets/CheckCircle.svg';
import * as closeIcon from '../../assets/CloseCircle.svg';
import * as trashIcon from '../../assets/Trash.svg';
import * as shareIcon from '../../assets/Share.svg';


import { AnimationWrapper, CancelIcon, ConfirmIcon, Item, Row, Text, TrashIcon, ShareIcon } from './LayoutsListItem.css';

import { Color } from '../../styles';
import { MetaWithAsyncHandlers, UserLayout } from '../../types/commons';

import Loading from '../Loading';

const ERROR_SHOW_DURATION_MS = 5000;

export enum Stage {
  Confirm = 'confirm',
  Default = 'default',
  Disabled = 'disabled',
  Error = 'error',
}

interface Props {
  activeId: UserLayout['id'] | null;
  close: () => void;
  deleteLayout: (id: UserLayout['id'], meta: MetaWithAsyncHandlers<UserLayout['id']>) => void;
  handleClickDelete: () => void;
  id: string;
  name: string;
  resetActiveId: () => void;
  restoreLayout: (id: UserLayout['id']) => void;
}

interface State {
  isSubmitting: boolean;
  stage: Stage;
}

class LayoutsListItem extends React.Component<Props, State> {
  static getDerivedStateFromProps(props: Props, _: State) {
    const { activeId, id } = props;

    switch (activeId) {
      case null:
        return { stage: Stage.Default };
      case id:
        return { stage: Stage.Confirm };
      default:
        return { stage: Stage.Disabled };
    }
  }

  errorTimeout?: number;

  constructor(props: Props) {
    super(props);

    this.state = {
      isSubmitting: false,
      stage: Stage.Default,
    };
  }

  componentWillUnmount() {
    const { resetActiveId } = this.props;

    this.clearTimeouts();
    resetActiveId();
  }

  onError = () => {
    this.setState({ stage: Stage.Error });
    this.errorTimeout = window.setTimeout(this.resetRow, ERROR_SHOW_DURATION_MS);
  };

  onSuccess = () => {
    this.setState({ stage: Stage.Default });
  };

  handleClickCancelDelete = () => {
    const { resetActiveId } = this.props;
    resetActiveId();
  };

  handleRestoreClick = () => {
    const { close, id, restoreLayout } = this.props;

    close();
    restoreLayout(id);
  };

  handleClickConfirmDelete = () => {
    const { deleteLayout, id, resetActiveId } = this.props;

    this.setState({ isSubmitting: true });

    const meta = { onFailure: this.onError, onSuccess: this.onSuccess };

    deleteLayout(id, meta);
    resetActiveId();
  };

  clearTimeouts = () => {
    window.clearTimeout(this.errorTimeout);
  };

  resetRow = () => {
    this.clearTimeouts();
    this.setState({ stage: Stage.Default });
  };

  renderIconAnimations = () => {
    const { handleClickDelete } = this.props;
    const { stage, isSubmitting } = this.state;

    return (
      <AnimationWrapper>
        <ConfirmIcon hoverColor={Color.SATURN} imgSrc={checkIcon} isVisible={stage === Stage.Confirm} onClick={this.handleClickConfirmDelete} size={14} />
        {!isSubmitting && <ShareIcon hoverColor={Color.MARS} imgSrc={shareIcon} isVisible={stage === Stage.Confirm} onClick={handleClickDelete} size={16} />}
        {!isSubmitting && <TrashIcon hoverColor={Color.MARS} imgSrc={trashIcon} isVisible={stage === Stage.Confirm} onClick={handleClickDelete} size={20} />}

        <CancelIcon hoverColor={Color.MARS} imgSrc={closeIcon} isVisible={stage === Stage.Confirm} onClick={this.handleClickCancelDelete} size={14} />
      </AnimationWrapper>
    );
  };

  renderItem = () => {
    const { isSubmitting, stage } = this.state;
    const { id, name } = this.props;

    return (
      <>
        <Item isDefault={stage === Stage.Default} isDisabled={stage === Stage.Disabled || isSubmitting} key={id} onClick={this.handleRestoreClick}>
          {name}
        </Item>

        {isSubmitting && <Loading size={11} />}

        {this.renderIconAnimations()}
      </>
    );
  };

  render() {
    const { activeId, id } = this.props;
    const { isSubmitting, stage } = this.state;

    return (
      <Row
        isActive={activeId === id}
        isDisabled={stage === Stage.Disabled || isSubmitting}
        onClick={stage === Stage.Disabled ? this.handleClickCancelDelete : undefined}
      >
        {stage === Stage.Error ? <Text>Error</Text> : this.renderItem()}
      </Row>
    );
  }
}

export default LayoutsListItem;
