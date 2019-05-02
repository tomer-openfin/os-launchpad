import styled from 'styled-components';

import { Color } from '../../styles';
import { DirectionalPosition, Orientation } from '../../types/enums';
import { getLauncherOrientation } from '../../utils/directionalPositionHelpers';
import { Icon } from '../SvgIcon';

export const Wrapper = styled.div<{ size: number; launcherPosition: DirectionalPosition }>`
  align-items: center;
  background-color: ${Color.VACUUM};
  bottom: 0;
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  position: absolute;
  right: 0;
  z-index: 1;

  &:hover {
    ${Icon} {
      background-color: ${Color.MARS};
    }
  }

  ${({ launcherPosition, size }) => {
    const isHorizontal = getLauncherOrientation(launcherPosition) === Orientation.Horizontal;
    const iconSize = `${size * 0.75}px`;

    return `
      height: ${isHorizontal ? '100%' : `${size}px`};
      width: ${isHorizontal ? `${size}px` : '100%'};

      ${Icon} {
        height: ${iconSize};
        width: ${iconSize};
      }
    `;
  }}
`;
