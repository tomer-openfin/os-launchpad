import * as React from 'react';

import * as EditIcon from '../../assets/Edit.svg';

import SvgIcon from '../SvgIcon';

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
      <Cell onClick={handleEdit} title={name}>
        <Dot color={color} />

        <Name>{name}</Name>
      </Cell>

      <Cell title={`${count}`}>
        <Text>{count}</Text>
      </Cell>

      <Cell title={contextName}>
        <Text isDisabled={!contextName}>{contextName || '---'}</Text>
      </Cell>

      <Cell title={`Edit ${name}`}>
        <SvgIcon disabled={!handleEdit} imgSrc={EditIcon} onClick={handleEdit} size="22px" />
      </Cell>
    </Wrapper>
  );
};

export default ContextGroupItem;
