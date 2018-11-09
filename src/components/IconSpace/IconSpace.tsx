import * as React from 'react';

import { Background, Icon } from './IconSpace.css';

interface Props {
  backgroundImg?;
  className?: string;
  draggable?: boolean;
  hover?: boolean;
  iconImg?;
  large?: boolean;
  onClick?: () => void;
}

const IconSpace = ({ backgroundImg, iconImg, draggable, onClick, large, hover }: Props) => (
  <Background imgSrc={backgroundImg} draggable={draggable} onClick={onClick} large={large} clickable={!!onClick}>
    <Icon imgSrc={iconImg} draggable={draggable} large={large} hover={hover} />
  </Background>
);

export default IconSpace;
