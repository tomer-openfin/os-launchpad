import * as React from 'react';

import { Subtract } from '../../types/utils';

import { Cell, Dot, Name, Text, Wrapper } from './ContextGroupItem.css';

export interface ContextChannel {
  color: string;
  contextName?: string;
  count: number;
  id: string;
  name: string;
}

interface Props extends Subtract<ContextChannel, { id: string }> {
  className?: string;
  handleEdit?: () => void;
}

const ContextGroupItem = ({ className, color, contextName, count, handleEdit, name }: Props) => {
  return (
    <Wrapper className={className}>
      <Cell onClick={handleEdit} title={`Edit ${name}`}>
        <Dot color={color} />

        <Name>{name}</Name>

        <Text>{`(${count})`}</Text>
      </Cell>

      <Cell title={contextName}>
        <Text isDisabled={!contextName}>{contextName || '---'}</Text>
      </Cell>

    </Wrapper>
  );
};

export default ContextGroupItem;
