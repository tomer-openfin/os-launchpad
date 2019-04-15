import styled from 'styled-components';

import { Color, Typography } from '../../styles';

export const Text = styled.p`
  ${Typography.TypeStyleSol}

  color: ${Color.SUN};
  margin: 0;
  opacity: 0.6;
  text-align: center;
  white-space: pre-line;
`;

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`;
