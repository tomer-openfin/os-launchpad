import styled from 'styled-components';

import { Typography } from '../../styles';
import Color from '../../styles/color';
import Button from '../Button';

export const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 20px;
  padding-bottom: 18px;
  display: flex;
  flex-direction: column;

  p {
    ${Typography.TypeStyleArcturus}
    color: ${Color.SUN};
    margin: 0;
    padding-bottom: 22px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 22px;

  ${Button} {
    margin-left: 14px;
  }
`;
