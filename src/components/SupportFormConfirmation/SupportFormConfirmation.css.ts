import styled from 'styled-components';

import { Typography } from '../../styles';
import Color from '../../styles/color';

export const TextWrapper = styled.div`
  max-width: 307px;
  margin: 0 auto;
`;

export const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 39px 20px 33px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  p {
    ${Typography.TypeStyleArcturus}
    color: ${Color.SUN};
    margin: 0;
    padding-bottom: 22px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
