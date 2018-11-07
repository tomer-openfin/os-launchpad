import styled from 'styled-components';

import { Color } from '../../styles';

interface ImgProps {
  clickable?: boolean;
  draggable?: boolean;
  imgSrc?;
  large?: boolean;
  medium?: boolean;
  small?: boolean;
}

export const Background = styled.div<ImgProps>`
  background: url(${props => props.imgSrc || ''});
  background-size: cover;
  background-repeat: no-repeat;
  height: ${props => (props.large ? '50px' : '50px')};
  width: ${props => (props.large ? '50px' : '50px')};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${props => (props.clickable ? 'pointer' : 'default')};
  -webkit-app-region: ${props => (props.draggable ? 'drag' : 'no-drag')};
`;

export const Icon = styled.div<ImgProps>`
  background: url(${props => props.imgSrc || ''});
  background-size: contain;
  background-repeat: no-repeat;
  height: ${props => (props.small ? '34px' : '34px')};
  width: ${props => (props.small ? '17px' : '34px')};
  -webkit-app-region: ${props => (props.draggable ? 'drag' : 'no-drag')};

  &:hover {
    background-color: ${Color.GREY};
    border-radius: 2px;
    cursor: pointer;
    fill: ${Color.SEAGULL} !important;
  }
`;
