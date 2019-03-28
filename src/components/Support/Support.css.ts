import styled from 'styled-components';

import * as blobDarkLarge from '../../assets/BlobDarkLarge.svg';

import { Color, Typography } from '../../styles';

import Button from '../Button';

export const StyledButton = styled(Button)`
  min-height: 136px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;

  ${StyledButton} + ${StyledButton} {
    margin-left: 20px;
  }
`;

export const P = styled.p`
  ${Typography.TypeStyleArcturus}

  color: ${Color.SUN};
  margin: 0;
  padding-bottom: 22px;

  span {
    color: ${Color.NEBULA};
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-image: url(${blobDarkLarge});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;
