import * as React from 'react';

import * as PlusIcon from '../../assets/PlusCircle.svg';

import { Color } from '../../styles';
import { AddIcon, Dot, Text, Wrapper } from './ContextWindowsItem.css';

interface Props {
  color: string;
  colorTitle: string;
  name: string;
  handleAdd: () => void;
}

const ContextWindowsItem = ({ color, colorTitle, name, handleAdd }: Props) => (
  <Wrapper>
    <Dot color={color} title={colorTitle} />

    <Text title={name}>{name}</Text>

    <AddIcon hoverColor={Color.COMET} imgSrc={PlusIcon} onClick={handleAdd} size={15} />
  </Wrapper>
);

export default ContextWindowsItem;
