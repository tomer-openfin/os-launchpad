import * as React from 'react';

import { Identity } from '../../types/commons';
import { Content, Header, ItemsWrapper, Wrapper } from './ContextGroupWindows.css';

import withWindowNameAndSnapshot from '../../hocs/withWindowNameAndSnapshot';
import ContextGroupWindowsItem from '../ContextGroupWindowsItem';
import ContextManagerEmptyState from '../ContextManagerEmptyState';
import DragWrapper, { createChannelsHandleDrop, handleDragOver } from '../DragWrapper';

const EnhancedContextGroupWindowsItem = withWindowNameAndSnapshot(ContextGroupWindowsItem);

export interface Props {
  className?: string;
  contextWindows: Identity[];
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
        {contextWindows.map(identity => {
          const handleRemoveCreator = () => handleRemove(identity);

          return (
            <DragWrapper dataTransferObj={{ ...identity }} key={`${identity.uuid}::${identity.name}`}>
              <EnhancedContextGroupWindowsItem
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
