import styled, { css } from 'styled-components';

import { Color } from '../../styles/index';
import { Props } from './SvgIcon';

export const Icon = styled.div<Props>`
  display: inline-block;
  background-color: ${Color.COMET};
  mask: url(${props => props.imgSrc});
  mask-size: contain;
  mask-position: center;
  mask-repeat: no-repeat;
  height: ${props => props.size}px;
  width: ${props => props.size}px;

  &:hover {
    background-color: ${Color.URANUS};
  }

  ${props =>
    props.onClick &&
    css`
      cursor: pointer;
    `}
`;
