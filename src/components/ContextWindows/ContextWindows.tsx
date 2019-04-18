import * as React from 'react';

import { ContextMember } from '../../redux/channels/types';
import { Identity } from '../../types/commons';
import { Content, Header, ItemsWrapper, StyledContextManagerEmptyState, Wrapper } from './ContextWindows.css';

import withContextMemberName from '../../hocs/withContextMemberName';
import ContextWindowsItem from '../ContextWindowsItem';
import DragWrapper, { createChannelsHandleDrop, handleDragOver } from '../DragWrapper';

const ContextWindowsItemWithName = withContextMemberName(ContextWindowsItem);

export interface ChannelIdentity {
  color: string;
  id: string;
  isGlobal: boolean;
  name: string;
}

export interface ContextWindowsGroup {
  channel: ChannelIdentity;
  contextWindows: ContextMember[];
}

export interface Props {
  contextWindowsByGroup: ContextWindowsGroup[];
  handleAdd: (identity: Identity, id: string) => void;
  handleDrop: (uuid: string, name: string, channelId: string) => void;
  isEmpty?: boolean;
  preventRender?: boolean;
}

const ContextWindows = ({ contextWindowsByGroup, handleAdd, isEmpty, handleDrop, preventRender }: Props) => (
  <Wrapper onDragOver={handleDragOver} onDrop={createChannelsHandleDrop(handleDrop)}>
    <Header>Other Running Windows</Header>

    <Content>
      {isEmpty && (
        <StyledContextManagerEmptyState>
          {`There are no other
            windows outside of
            this group.`}
        </StyledContextManagerEmptyState>
      )}

      <ItemsWrapper>
        {contextWindowsByGroup.map(({ channel, contextWindows }) => {
          return contextWindows.map(({ appName, identity }) => {
            const handleClickAdd = () => handleAdd(identity, channel.id);

            return (
              <DragWrapper key={`${identity.uuid}::${identity.name}`} dataTransferObj={{ ...identity, channelId: channel.id }}>
                <ContextWindowsItemWithName
                  appName={appName}
                  color={channel.isGlobal ? '' : channel.color}
                  colorTitle={channel.isGlobal ? '' : channel.name}
                  handleAdd={handleClickAdd}
                  identity={identity}
                  isPollingActive={!preventRender}
                  key={`${identity.uuid}::${identity.name}`}
                />
              </DragWrapper>
            );
          });
        })}
      </ItemsWrapper>
    </Content>
  </Wrapper>
);

export default ContextWindows;
