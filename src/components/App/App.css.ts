import styled from 'styled-components';

import * as blobDark from '../../assets/BlobDark.svg';

import { DirectionalPosition, Orientation } from '../../types/commons';
import { getLauncherOrientation } from '../../utils/directionalPositionHelpers';
import { isBottomOrRight, isTopOrBottom } from '../../utils/windowPositionHelpers';

import { Color } from '../../styles';

import Logo from '../Logo';

interface PositionProp {
  launcherPosition: DirectionalPosition;
}

interface ExpandedProp {
  isDrawerExpanded: boolean;
}

interface AppListWrapperProps {
  endPadding: number;
  launcherPosition: DirectionalPosition;
}

interface WrapperProps {
  launcherPosition: DirectionalPosition;
  size: number;
}

/* Styled Imports */
export const StyledLogo = styled(Logo)`
  background-color: ${Color.KUIPER_BELT};
  background-size: 90%;
`;
/* End Styled Imports */

export const AppListWrapper = styled.div<AppListWrapperProps>`
  overflow: hidden;

  ${({ endPadding, launcherPosition }) => {
    const isOnTopOrBottom = isTopOrBottom(launcherPosition);

    return `
      margin-bottom: ${isOnTopOrBottom ? 0 : endPadding}px;
      margin-right: ${isOnTopOrBottom ? endPadding : 0}px;
    `;
  }}
`;

export const Main = styled.div<PositionProp>`
  align-items: ${({ launcherPosition }) => (isBottomOrRight(launcherPosition) ? 'flex-start' : 'flex-end')};
  display: flex;
  flex-direction: ${({ launcherPosition }) => (isTopOrBottom(launcherPosition) ? 'row' : 'column')};
  height: 100vh;
  width: 100vw;

  &:before {
    content: '';
    position: absolute;
    background-image: url(${blobDark});
    background-repeat: repeat;
    background-position: center;
    background-size: auto;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    transform: rotate(${props => (isTopOrBottom(props.launcherPosition) ? '0' : '-180deg')});
    z-index: -1;
  }
`;

export const Overlay = styled.div<ExpandedProp>`
  position: absolute;
  top: 0;
  left: 0;

  ${({ isDrawerExpanded }) => `
    width: ${isDrawerExpanded ? '100%' : '0'};
    height: ${isDrawerExpanded ? '100%' : '0'};
  `}
`;

export const SystemDrawerWrapper = styled.div<PositionProp>`
  display: inline-flex;
  position: absolute;

  ${({ launcherPosition }) => {
    const isHorizontal = getLauncherOrientation(launcherPosition) === Orientation.Horizontal;

    return `
    height: ${isHorizontal ? '100%' : 'auto'};
    width: ${isHorizontal ? 'auto' : '100%'};
    bottom: ${isHorizontal ? 'initial' : '0'};
    right: ${isHorizontal ? '0' : 'initial'};
    `;
  }}
`;

export const Wrapper = styled.div<WrapperProps>`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  position: relative;

  ${({ launcherPosition, size }) => {
    const isOnTopOrBottom = isTopOrBottom(launcherPosition);

    return `
      flex-direction: ${isOnTopOrBottom ? 'row' : 'column'};
      height: ${isOnTopOrBottom ? `${size}px` : '100vh'};
      width: ${isOnTopOrBottom ? '100vw' : `${size}px`};
    `;
  }}
`;
