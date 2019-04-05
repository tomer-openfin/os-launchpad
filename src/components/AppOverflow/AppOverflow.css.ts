import styled from 'styled-components';

import { Color } from '../../styles';
import { DirectionalPosition } from '../../types/commons';
import { isRight, isTopOrBottom } from '../../utils/windowPositionHelpers';

import { StyledTransitionGroupWrapper as AppList } from '../AppList';

export const Window = styled.div<{ launcherPosition: DirectionalPosition }>`
  height: 100vh;
  overflow-x: hidden;
  overflow-y: hidden;

  ${({ launcherPosition }) => {
    const chosenDirection = isRight(launcherPosition) ? 'to right' : 'to left';

    return `
      background-image: linear-gradient(${isTopOrBottom(launcherPosition) ? 'to bottom' : chosenDirection}, ${Color.OORT_CLOUD}, ${Color.VACUUM});
    `;
  }}

  ${AppList} {
    height: 100%;
    width: 100%;
  }
`;
