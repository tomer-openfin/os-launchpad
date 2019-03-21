import styled from 'styled-components';

import { Color, Typography } from '../../styles';

export const P = styled.p`
  ${Typography.TypeStyleArcturus}

  color: ${Color.SUN};
  margin: 0;
  padding-bottom: 22px;

  span {
    color: ${Color.NEBULA};
  }
`;

export const Wrapper = styled.div<{ width: string }>`
  width: ${({ width }) => width};
`;
