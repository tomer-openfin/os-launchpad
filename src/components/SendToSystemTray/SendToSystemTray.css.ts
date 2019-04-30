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

  /* &:hover {
    opacity: 0.7;
  } */

  ${({ launcherPosition, size }) => {
    const isHorizontal = getLauncherOrientation(launcherPosition) === Orientation.Horizontal;

    return `
      height: ${isHorizontal ? '100%' : 'auto'};
      width: ${isHorizontal ? 'auto' : '100%'};

      ${Icon} {
        ${isHorizontal ? 'height' : 'width'}: ${size * 0.75}px;

        &:hover {
          background-color: ${Color.MARS};
        }
      }
    `;
  }}
`;
