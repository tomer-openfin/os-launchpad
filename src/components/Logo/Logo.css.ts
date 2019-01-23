import styled from 'styled-components';

import * as EmptyLogo from '../../assets/empty-logo.svg';

import { Props } from './Logo';

export const LogoIcon = styled.div<Props>`
  background-image: url(${props => props.imgSrc || EmptyLogo});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  height: ${props => props.size}px;
  min-height: ${props => props.size}px;
  min-width: ${props => props.size}px;
  width: ${props => props.size}px;
`;
