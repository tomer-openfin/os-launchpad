import styled, { css } from 'styled-components';

import { Props } from './SvgIcon';

export const Icon = styled.div<Props>`
  display: inline-block;
  background-color: #e7e7e7;
  mask: url(${props => props.imgSrc});
  mask-size: contain;
  mask-position: center;
  mask-repeat: no-repeat;
  height: ${props => props.size}px;
  width: ${props => props.size}px;

  ${props =>
    props.onClick &&
    css`
      cursor: pointer;

      &:hover {
        background-color: #7bd5c1;
      }
    `}
`;
