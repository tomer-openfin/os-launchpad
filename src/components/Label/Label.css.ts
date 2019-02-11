import styled from 'styled-components';

import { Color, Typography } from '../../styles';

export const ErrorWrapper = styled.div`
  bottom: -20px;
  left: 0;
  position: absolute;
`;

export const LabelWrapper = styled.div`
  ${Typography.TypeStyleArcturus}

  color: ${Color.SUN};
  margin-bottom: 5px;
`;

export const Wrapper = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  position: relative;
`;
