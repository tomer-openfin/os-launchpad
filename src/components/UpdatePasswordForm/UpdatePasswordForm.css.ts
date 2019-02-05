import styled from 'styled-components';

import { Color } from '../../styles';
import { ResponsiveWidth } from '../ResponsiveForm/ResponsiveForm.css';

export const Wrapper = styled.div`
  align-items: center;
  background-color: ${Color.KUIPER_BELT};
  display: flex;
  flex-direction: column;
  height: 405px;
  justify-content: flex-start;
  width: 420px;
  overflow: hidden;
`;

export const ErrorWrapper = styled.div<{ shown?: boolean }>`
  ${ResponsiveWidth}

  bottom: 0;
  position: absolute;
`;
