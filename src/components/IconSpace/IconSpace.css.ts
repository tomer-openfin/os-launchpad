import styled, { css } from 'styled-components';

import { Color } from '../../styles';

interface ImgProps {
  clickable?: boolean;
  draggable?: boolean;
  imgSrc?;
  large?: boolean;
  medium?: boolean;
  hover?: boolean;
}

export const Background = styled.div<ImgProps>`
  background: url(${props => props.imgSrc || ''});
  background-size: cover;
  background-repeat: no-repeat;
  height: ${props => (props.large ? '68px' : '50px')};
  width: ${props => (props.large ? '68px' : '50px')};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${props => (props.clickable ? 'pointer' : 'inherit')};
  -webkit-app-region: ${props => (props.draggable ? 'drag' : 'no-drag')};
`;

export const Icon = styled.div<ImgProps>`
  background: url(${props => props.imgSrc || ''});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  height: 34px;
  width: 34px;
  -webkit-app-region: ${props => (props.draggable ? 'drag' : 'no-drag')};

  ${props =>
    props.hover &&
    css`
      &:hover {
        background-color: ${Color.GREY};
        border-radius: 2px;
        cursor: pointer;
        fill: ${Color.SEAGULL} !important;
      }
    `}
`;
