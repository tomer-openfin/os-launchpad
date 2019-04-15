import * as React from 'react';

import { Header, HeaderLabel, Item, ItemWrapper, StyledContextGroupItem, Wrapper } from './ContextGroupList.css';

import { ContextChannel } from '../ContextGroupItem';
import ContextManagerEmptyState from '../ContextManagerEmptyState';

interface Props {
  activeId: string | null;
  channels: ContextChannel[];
  handleEdit: (id: string) => void;
  headerMargin?: number;
  rowHeight?: number;
  rowMargin?: number;
}

const defaultProps = {
  headerMargin: 8,
  rowHeight: 22,
  rowMargin: 22,
};

const ContextGroupList = ({
  activeId,
  channels,
  handleEdit,
  headerMargin = defaultProps.headerMargin,
  rowHeight = defaultProps.rowHeight,
  rowMargin = defaultProps.rowMargin,
}: Props) => {
  return (
    <Wrapper>
      <Header margin={headerMargin}>
        <HeaderLabel>Group</HeaderLabel>
        <HeaderLabel>Count</HeaderLabel>
        <HeaderLabel>Context</HeaderLabel>
        <HeaderLabel>Manage</HeaderLabel>
      </Header>

      {!channels.length && <ContextManagerEmptyState>You do not have any active groups.</ContextManagerEmptyState>}

      <ItemWrapper margin={rowMargin}>
        {channels.map((channel, index) => {
          const isActive = !!activeId && activeId === channel.id;
          const isHidden = !!activeId && activeId !== channel.id;
          const onClickEdit = isActive ? undefined : () => handleEdit(channel.id);

          return (
            <Item key={channel.name} height={rowHeight}>
              <StyledContextGroupItem
                handleEdit={onClickEdit}
                index={index}
                isActive={isActive}
                isHidden={isHidden}
                yTransformSize={rowHeight + rowMargin}
                {...channel}
              />
            </Item>
          );
        })}
      </ItemWrapper>
    </Wrapper>
  );
};

export default ContextGroupList;
