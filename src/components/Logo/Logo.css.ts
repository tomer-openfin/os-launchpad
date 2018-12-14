import styled from 'styled-components';

import * as EmptyLogo from '../../assets/empty-logo.svg';

import { LOGO } from '../../utils/sizingConstants';
import { Props } from './Logo';

export const LogoIcon = styled.div<Props>`
  background-image: url(${props => props.imgSrc || EmptyLogo});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  height: ${LOGO}px;
  min-height: ${LOGO}px;
  min-width: ${LOGO}px;
  width: ${LOGO}px;
`;
