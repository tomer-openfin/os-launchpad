import styled from 'styled-components';

import { Color } from '../../styles';
import { DirectionalPosition, Orientation } from '../../types/commons';
import { getLauncherOrientation } from '../../utils/directionalPositionHelpers';
import { isBottomOrRight, isRight, isTopOrBottom } from '../../utils/windowPositionHelpers';

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

export const LogoWrapper = styled.div<WrapperProps>`
  height: ${({ size }) => size}px;
  min-height: ${({ size }) => size}px;
  min-width: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  ${({ launcherPosition }) => {
    const chosenDirection = isRight(launcherPosition) ? 'to right' : 'to left';

    return `
      background-image: linear-gradient(${isTopOrBottom(launcherPosition) ? 'to bottom' : chosenDirection}, ${Color.OORT_CLOUD}, ${Color.VACUUM});
    `;
  }}
`;

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

  ${({ launcherPosition }) => {
    const chosenDirection = isRight(launcherPosition) ? 'to right' : 'to left';

    return `background-image: linear-gradient(${isTopOrBottom(launcherPosition) ? 'to bottom' : chosenDirection}, ${Color.OORT_CLOUD}, ${Color.VACUUM})`;
  }}
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
