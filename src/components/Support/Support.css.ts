import styled from 'styled-components';

import * as blobDarkLarge from '../../assets/BlobDarkLarge.svg';

import Button from '../Button';

export const StyledButton = styled(Button)`
  min-height: 136px;
`;

export const BigButtonWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: auto;

  ${StyledButton} + ${StyledButton} {
    margin-left: 20px;
  }
`;

export const Wrapper = styled.div`
  background-image: url(${blobDarkLarge});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;
