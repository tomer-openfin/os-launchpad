import styled from 'styled-components';

import { Color } from '../../styles';
import { DirectionalPosition, Orientation } from '../../types/enums';
import { getLauncherOrientation } from '../../utils/directionalPositionHelpers';

export const Wrapper = styled.div<{ launcherPosition: DirectionalPosition }>`
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
    opacity: 0.7;
  }

  ${({ launcherPosition }) => {
    const isHorizontal = getLauncherOrientation(launcherPosition) === Orientation.Horizontal;

    return `
      height: ${isHorizontal ? '100%' : 'auto'};
      width: ${isHorizontal ? 'auto' : '100%'};
    `;
  }}
`;
