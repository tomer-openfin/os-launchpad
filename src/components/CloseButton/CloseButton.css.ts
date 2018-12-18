import styled from 'styled-components';

import * as XIcon from '../../assets/TinyX.svg';
import { Color } from '../../styles/index';
import { CloseButtonProps } from './CloseButton';

export const CloseButtonWrapper = styled.div<CloseButtonProps>`
  -webkit-app-region: drag !important;
  align-items: center;
  background: ${Color.VACUUM};
  border: none;
  ${props => props.bottomBorder && `border-bottom: 2px solid ${Color.MERCURY};`}
  display: flex;
  height: 100%;
  justify-content: center;
  margin: 0;
  width: 60px;
`;

export const CloseCTA = styled.button`
  cursor: pointer;
  background-color: ${Color.SUN};
  height: 22px;
  width: 22px;
  border-radius: 50%;
  outline: none;
  border: none;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${Color.JUPITER};
  }
`;

export const CloseIcon = styled.span`
  background-color: ${Color.VACUUM};
  height: 6px;
  mask-position: center;
  mask-repeat: no-repeat;
  mask-image: url(${XIcon});
  width: 7px;
`;
