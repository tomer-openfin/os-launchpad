import styled from 'styled-components';

import * as blobDarkLarge from '../../assets/BlobDarkLarge.svg';

import { Color, Typography } from '../../styles';

import Button from '../Button';
import { Wrapper as LabelWrapper } from '../Label';

export const StyledButton = styled(Button)`
  min-height: 136px;
`;

export const BigButtonWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100vw;

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

// Shared support form components:
export const EmailText = styled.span``;

export const P = styled.p`
  ${Typography.TypeStyleArcturus}

  color: ${Color.SUN};
  margin: 0;
  padding-bottom: 22px;

  ${EmailText} {
    color: ${Color.NEBULA};
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: auto;
`;

export const InputWrapper = styled.div`
  ${LabelWrapper} {
    margin-bottom: 18px;
  }
`;

export const Form = styled.form`
  background-color: ${Color.ASTEROID_BELT};
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px 0px 33px 0px;
  width: 305px;
  margin: 0 auto;
`;
