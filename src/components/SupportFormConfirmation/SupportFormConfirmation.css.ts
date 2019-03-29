import styled from 'styled-components';

import { Typography } from '../../styles';
import Color from '../../styles/color';

import Button from '../Button';
import { P } from '../Support/Support.css';

export const TextWrapper = styled.div`
  margin: 0 auto;
  max-width: 307px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
  padding: 39px 20px 33px 20px;
  width: 100vw;

  ${P} {
    ${Typography.TypeStyleArcturus}

    color: ${Color.SUN};
    margin: 0;
    padding-bottom: 22px;
  }

  ${Button} {
    align-self: center;
  }
`;
