import styled from 'styled-components';

import { Color, Typography } from '../../styles';

export const Count = styled.div`
  ${Typography.TypeStyleProcyon};

  align-items: center;
  color: ${Color.SUN};
  display: flex;
  height: 100%;
  justify-content: center;
  position: absolute;
  top: 0;
  width: 100%;
`;

export const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  line-height: 0;

  &:hover {
    opacity: 0.75;
  }
`;
