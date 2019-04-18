import * as React from 'react';

import * as MinusIcon from '../../assets/MinusCircle.svg';

import { DeleteIcon, Text, Wrapper } from './ContextGroupWindowsItem.css';

import Color from '../../styles/color';

interface Props {
  name: string;
  handleRemove: () => void;
}

const ContextGroupWindowsItem = ({ handleRemove, name }: Props) => (
  <Wrapper>
    <Text title={name}>{name}</Text>

    <DeleteIcon color={Color.MARS} hoverColor={Color.MARS} imgSrc={MinusIcon} onClick={handleRemove} size={15} />
  </Wrapper>
);

export default ContextGroupWindowsItem;
