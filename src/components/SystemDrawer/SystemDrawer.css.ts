import styled from 'styled-components';

import Color from '../../styles/color';
import { Orientation } from '../../types/commons';
import { LauncherSizeConfig } from '../../utils/launcherSizeConfigs';

import SvgIcon from '../SvgIcon';

interface SvgIconWrapper {
  sizingConfig: LauncherSizeConfig;
  orientation: Orientation;
}

interface WrapperProps {
  bottomOrRightMargin: number;
  sizingConfig: LauncherSizeConfig;
  orientation: Orientation;
  size: number;
}

const getIsHorizontal = (orientation: Orientation) => orientation === Orientation.Horizontal;

export const SvgIconWrapper = styled.div<SvgIconWrapper>`
  align-items: center;
  display: inline-flex;
  flex-grow: 0;
  flex-shrink: 0;

  ${({ sizingConfig, orientation }) => {
    const isHorizontal = getIsHorizontal(orientation);
    const marginSize = `${sizingConfig.systemIconGutter}px`;

    return `
      ${isHorizontal ? `margin-left: ${marginSize}` : `margin-top: ${marginSize}`};
    `;
  }}
`;

export const Wrapper = styled.div<WrapperProps>`
  align-items: center;
  display: inline-flex;
  justify-content: flex-end;
  position: relative;

  ${({ bottomOrRightMargin, sizingConfig, orientation, size }) => {
    const isHorizontal = getIsHorizontal(orientation);
    const startPadding = `${sizingConfig.systemDrawerPaddingStart}px`;
    const endPadding = `${sizingConfig.systemDrawerPaddingEnd}px`;
    const margin = `${bottomOrRightMargin}px`;

    return `
      background-color: ${Color.KUIPER_BELT};
      flex-direction: ${isHorizontal ? 'row' : 'column'};
      height: ${isHorizontal ? '100%' : `${size}px`};
      margin-bottom: ${isHorizontal ? 'initial' : margin};
      margin-right: ${isHorizontal ? margin : 'initial'};
      padding-bottom: ${isHorizontal ? 'initial' : endPadding};
      padding-left: ${isHorizontal ? startPadding : 'initial'};
      padding-right: ${isHorizontal ? endPadding : 'initial'};
      padding-top: ${isHorizontal ? 'initial' : startPadding};
      width: ${isHorizontal ? `${size}px` : '100%'};
    `;
  }}
`;
