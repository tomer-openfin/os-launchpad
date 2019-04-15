import * as React from 'react';

import { ContextMember } from '../../redux/channels/types';
import { Identity } from '../../types/commons';
import { Content, Header, ItemsWrapper, Wrapper } from './ContextGroupWindows.css';

import withContextMemberName from '../../hocs/withContextMemberName';
import ContextGroupWindowsItem from '../ContextGroupWindowsItem';
import ContextManagerEmptyState from '../ContextManagerEmptyState';
import DragWrapper, { createChannelsHandleDrop, handleDragOver } from '../DragWrapper';

const ContextGroupWindowsItemWithName = withContextMemberName(ContextGroupWindowsItem);

export interface Props {
  className?: string;
  contextWindows: ContextMember[];
  handleDrop: (uuid: string, name: string, channelId: string) => void;
  handleRemove: (identity: Identity) => void;
  preventRender?: boolean;
}

const ContextGroupWindows = ({ className, contextWindows, handleRemove, handleDrop, preventRender }: Props) => (
  <Wrapper className={className} onDragOver={handleDragOver} onDrop={createChannelsHandleDrop(handleDrop)}>
    <Header>Windows In Group</Header>

    <Content>
      {!contextWindows.length && (
        <ContextManagerEmptyState>
          {`There are no windows
            in this group.`}
        </ContextManagerEmptyState>
      )}

      <ItemsWrapper>
        {contextWindows.map(({ appName, identity }) => {
          const handleRemoveCreator = () => handleRemove(identity);

          return (
            <DragWrapper dataTransferObj={{ ...identity }} key={`${identity.uuid}::${identity.name}`}>
              <ContextGroupWindowsItemWithName
                appName={appName}
                handleRemove={handleRemoveCreator}
                identity={identity}
                isPollingActive={!preventRender}
                key={`${identity.uuid}::${identity.name}`}
              />
            </DragWrapper>
          );
        })}
      </ItemsWrapper>
    </Content>
  </Wrapper>
);

export default ContextGroupWindows;
