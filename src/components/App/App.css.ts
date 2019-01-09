import styled, { css } from 'styled-components';

import * as blobDark from '../../assets/BlobDark.svg';

import { DirectionalPosition } from '../../types/commons';
import * as SIZE from '../../utils/sizingConstants';
import { isBottomOrRight, isLeftOrRight, isTopOrBottom } from '../../utils/windowPositionHelpers';

import { Color } from '../../styles';

import Logo from '../Logo';
import SvgIcon from '../SvgIcon';

interface PositionProp {
  launcherPosition: DirectionalPosition;
}
interface ExpandedProp {
  isDrawerExpanded: boolean;
}
interface SizeProp {
  size: number;
}
interface EndPaddingProp {
  endPadding: number;
}

type ExpandedPositionProp = ExpandedProp & PositionProp;
type EndPaddingPositionProp = EndPaddingProp & PositionProp;
type ExpandedPositionSizeProp = ExpandedPositionProp & SizeProp;

/* Helpers */
const calcSystemDrawerWrapper = (size, evaluator, launcherPosition, isDrawerExpanded, suffix) => {
  const expandedState = isDrawerExpanded ? `calc(100${suffix} - ${SIZE.MAX_STATIC_DIMENSION}px)` : `${size}px`;
  return evaluator(launcherPosition) ? `${SIZE.MAX_STATIC_DIMENSION}px` : expandedState;
};

const calcSvgIconsMargin = (isDrawerExpanded, launcherPosition) => {
  const property = isTopOrBottom(launcherPosition) ? 'margin-left' : 'margin-top';
  const value = isDrawerExpanded ? `${SIZE.SYSTEM_GUTTER}px` : 0;

  return `${property}: ${value};`;
};
/* End Helpers */

/* Styled Imports */
export const StyledLogo = styled(Logo)`
  background-color: ${Color.KUIPER_BELT};
  background-size: 90%;
`;
/* End Styled Imports */

export const AppListWrapper = styled.div<EndPaddingPositionProp>`
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
  width: ${({ isDrawerExpanded }) => (isDrawerExpanded ? '100%' : '0')};
  height: ${({ isDrawerExpanded }) => (isDrawerExpanded ? '100%' : '0')};
`;

export const SystemDrawerWrapper = styled.div<ExpandedPositionSizeProp>`
  display: inline-block;
  position: absolute;
  height: ${({ size, launcherPosition, isDrawerExpanded }) => calcSystemDrawerWrapper(size, isTopOrBottom, launcherPosition, isDrawerExpanded, 'vh')};
  width: ${({ size, launcherPosition, isDrawerExpanded }) => calcSystemDrawerWrapper(size, isLeftOrRight, launcherPosition, isDrawerExpanded, 'vw')};
  top: ${({ launcherPosition }) => (isTopOrBottom(launcherPosition) ? 0 : 'auto')};
  right: ${({ launcherPosition }) => (isTopOrBottom(launcherPosition) ? 0 : 'auto')};
  bottom: ${({ launcherPosition }) => (isTopOrBottom(launcherPosition) ? 'auto' : 0)};
  left: ${({ launcherPosition }) => (isTopOrBottom(launcherPosition) ? 'auto' : 0)};
`;

export const SystemIconsWrapper = styled.div<ExpandedPositionSizeProp>`
  align-items: center;
  background-color: ${({ isDrawerExpanded }) => (isDrawerExpanded ? 'rgba(14,13,21,0.96)' : 'rgba(0,0,0,0.33)')};
  bottom: 0;
  display: flex;
  flex-direction: ${({ launcherPosition }) => (isTopOrBottom(launcherPosition) ? 'row' : 'column')};
  height: ${({ size, launcherPosition }) => (isTopOrBottom(launcherPosition) ? SIZE.MAX_STATIC_DIMENSION : size)}px;
  justify-content: flex-end;
  overflow: hidden;
  position: absolute;
  right: 0;
  white-space: nowrap;
  width: ${({ size, launcherPosition }) => (isTopOrBottom(launcherPosition) ? size : SIZE.MAX_STATIC_DIMENSION)}px;

  ${({ isDrawerExpanded, launcherPosition }) => {
    const padding = isDrawerExpanded ? SIZE.EXPANDED_SYSTEM_PADDING : SIZE.COLLAPSED_SYSTEM_PADDING;

    return isTopOrBottom(launcherPosition)
      ? `
          padding: 0 ${padding}px;
        `
      : `
          padding: ${padding}px 0;
        `;
  }}
`;

export const SystemIconWrapper = styled.div<ExpandedPositionProp>`
  flex-shrink: 0;
  line-height: 0;

  ${props => css`
    ${calcSvgIconsMargin(props.isDrawerExpanded, props.launcherPosition)}
  `}
`;

export const ToggleIcon = styled(SvgIcon)<ExpandedPositionProp>`
  ${props =>
    !props.isDrawerExpanded &&
    isLeftOrRight(props.launcherPosition) &&
    css`
      transform: rotate(90deg);
    `}

  ${props =>
    props.isDrawerExpanded &&
    css`
      background-color: ${Color.MARS};
    `}
`;

export const Wrapper = styled.div<EndPaddingPositionProp>`
  align-items: center;
  display: flex;
  flex-direction: ${({ launcherPosition }) => (isTopOrBottom(launcherPosition) ? 'row' : 'column')};
  height: ${({ launcherPosition }) => (isTopOrBottom(launcherPosition) ? `${SIZE.MAX_STATIC_DIMENSION}px` : '100vh')};
  justify-content: flex-start;
  position: relative;
  width: ${({ launcherPosition }) => (isTopOrBottom(launcherPosition) ? '100vw' : `${SIZE.MAX_STATIC_DIMENSION}px`)};
`;
