import styled from 'styled-components';

import * as GridPattern from '../../assets/GridPattern.svg';

import { Color } from '../../styles/index';
import { Props } from './ImagePreview';

export const LogoWrapper = styled.div<{ size: number }>`
  border-radius: ${({ size }) => size / 15}px;
  border: ${({ size }) => size / 15}px solid ${Color.VACUUM};
  background-color: ${Color.VACUUM};
  background-image: url(${GridPattern});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  height: ${({ size }) => size}px;
  min-height: ${({ size }) => size}px;
  min-width: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
`;

export const Image = styled.div<Props>`
  background-image: url(${props => props.imgSrc});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  height: 100%;
  width: 100%;
`;
