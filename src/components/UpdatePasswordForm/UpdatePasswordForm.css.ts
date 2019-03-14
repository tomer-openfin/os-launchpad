import styled from 'styled-components';

import { Color } from '../../styles';
import { ResponsiveWidth } from '../Responsive';

export const Wrapper = styled.div<{ height?: string }>`
  align-items: center;
  background-color: ${Color.KUIPER_BELT};
  display: flex;
  flex-direction: column;
  height: ${({ height }) => height || '405px'};
  justify-content: flex-start;
  width: 420px;
  overflow: hidden;
`;

export const ErrorWrapper = styled.div<{ shown?: boolean }>`
  ${ResponsiveWidth}

  bottom: 0;
  position: absolute;
`;
