import * as React from 'react';

import {
  Content,
  GroupWrapper,
  HEADER_MARGIN,
  Layout,
  RevealWrapper,
  ROW_HEIGHT,
  ROW_MARGIN,
  StyledBorders,
  StyledContextGroupWindows,
  StyledEditButton,
  Wrapper,
} from './ContextManager.css';

import { MetaWithAsyncHandlers } from '../../types/commons';

import { ContextChannel } from '../ContextGroupItem';
import ContextGroupList from '../ContextGroupList';
import ContextWindows from '../ContextWindows';
import WindowHeader from '../WindowHeader';

export const MAIN_WIDTH = 368;
export const SIDE_WIDTH = 214;
export const EXPANED_HEIGHT = 415;

export interface Props {
  activeId: string | null;
  channels: ContextChannel[];
  clearSnapshot: () => void;
  handleClose: () => void;
  handleEdit: (id: string | null, meta?: MetaWithAsyncHandlers) => void;
}

interface State {
  isDragDisabled: boolean;
}

class ContextManager extends React.Component<Props, State> {
  state = {
    isDragDisabled: false,
  };

  handleClickClose = () => {
    this.handleEnableDrag();
    this.props.clearSnapshot();
    this.props.handleClose();
  };

  handleEdit = (id: string | null) => {
    const { handleEdit } = this.props;
    this.handleDisableDrag();
    handleEdit(id, { onSuccess: this.handleEnableDrag, onFailure: this.handleEnableDrag });
  };

  handleFinishEditing = () => {
    this.props.clearSnapshot();
    this.handleEdit(null);
  };

  handleDisableDrag = () => {
    this.setState({ isDragDisabled: true });
  };

  handleEnableDrag = () => {
    this.setState({ isDragDisabled: false });
  };

  render() {
    const { activeId, channels } = this.props;
    const { isDragDisabled } = this.state;

    return (
      <Layout>
        <StyledBorders width={`${MAIN_WIDTH}px`}>
          <Wrapper>
            <WindowHeader handleClose={this.handleClickClose} isDragDisabled={isDragDisabled} label="ContextManager">
              Manage Context Groups
            </WindowHeader>

            <Content>
              <ContextGroupList
                activeId={activeId}
                channels={channels}
                handleEdit={this.handleEdit}
                headerMargin={HEADER_MARGIN}
                rowHeight={ROW_HEIGHT}
                rowMargin={ROW_MARGIN}
              />

              <GroupWrapper isHidden={!activeId}>
                <RevealWrapper>
                  <StyledContextGroupWindows />
                </RevealWrapper>

                <StyledEditButton width="100%" onClick={this.handleFinishEditing}>
                  Finish Editing
                </StyledEditButton>
              </GroupWrapper>
            </Content>
          </Wrapper>
        </StyledBorders>

        <StyledBorders isHidden={!activeId} width={`${SIDE_WIDTH}px`}>
          <ContextWindows />
        </StyledBorders>
      </Layout>
    );
  }
}

export default ContextManager;
