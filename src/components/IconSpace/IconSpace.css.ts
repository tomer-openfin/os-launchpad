import styled, { css } from 'styled-components';

import { Color } from '../../styles';

interface ImgProps {
  clickable?: boolean;
  draggable?: boolean;
  hover?: boolean;
  imgSrc?;
  large?: boolean;
  medium?: boolean;
}

export const Background = styled.div<ImgProps>`
  background: url(${props => props.imgSrc || ''});
  height: ${props => (props.large ? `80px` : `60px`)};
  width: ${props => (props.large ? `80px` : `60px`)};

  ${props =>
    props.large &&
    css`
      background-color: rgba(0, 0, 0, 0.5);
    `}

  ${props =>
    props.medium &&
    css`
      width: 42px;
    `}

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${props => (props.clickable ? 'pointer' : 'inherit')};
  -webkit-app-region: ${props => (props.draggable ? 'drag' : 'no-drag')};
`;

// IF TRAY ICON -> WIDTH IS 42PX
// IF TRAY ICON -> NO MARGIN/PADDING

export const Icon = styled.div<ImgProps>`
  background-color: ${Color.COMET};
  mask: url(${props => props.imgSrc || ''});
  mask-size: contain;
  mask-position: center;
  mask-repeat: no-repeat;
  height: ${props => (props.large ? `80px` : `45px`)};
  width: ${props => (props.large ? `80px` : `45px`)};
  -webkit-app-region: ${props => (props.draggable ? 'drag' : 'no-drag')};

  ${props =>
    props.medium &&
    css`
      height: 42px;
      width: 42px;
    `}

  ${props =>
    props.hover &&
    css`
      &:hover {
        background-color: ${Color.DOVE_GREY};
        cursor: pointer;
      }
    `}
`;
