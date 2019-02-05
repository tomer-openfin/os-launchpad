import styled from 'styled-components';

import { Color, Typography } from '../../styles';

import Button from '../Button';

export const StyledButton = styled(Button)`
  width: 100%;
`;

export const IntroMessage = styled.p`
  ${Typography.TypeStyleCanopus}

  color: ${Color.SUN};
  margin: 0 0 20px;
`;

export const Wrapper = styled.div``;
