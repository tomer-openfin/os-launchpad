import styled from 'styled-components';

import { Color } from '../../styles';

import { Tab } from '../Tabs';

export const StyledTab = styled(Tab)`
  flex: 1;
  overflow: hidden;
`;

export const Wrapper = styled.div<{ height?: string; width?: string }>`
  background-color: ${Color.ASTEROID_BELT};
  display: flex;
  flex-direction: column;
  position: relative;
  height: ${({ height }) => height || '100%'};
  width: ${({ width }) => width || '100%'};
  overflow: hidden;
`;
