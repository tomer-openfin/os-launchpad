import styled from 'styled-components';

import * as blobDarkLarge from '../../assets/BlobDarkLarge.svg';

import ErrorMessage from '../ErrorMessage';
import { Form as ForgotPasswordChangeForm } from '../ForgotPasswordChangeForm';
import { Form as ForgotPasswordRequestForm } from '../ForgotPasswordRequestForm';
import { Wrapper as ForgotPasswordSuccessWrapper } from '../ForgotPasswordSuccess';

export const StyledErrorMessage = styled(ErrorMessage)`
  align-items: center;
  bottom: 0;
  display: flex;
  height: 34px;
  justify-content: center;
  padding: 0 10px;
  position: absolute;
  text-align: center;
  width: 100%;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  max-width: 305px;

  ${ForgotPasswordRequestForm} {
    margin: 50px 0;
  }

  ${ForgotPasswordChangeForm} {
    margin: 20px 0;
  }

  ${ForgotPasswordSuccessWrapper} {
    align-self: center;
  }
`;

export const Wrapper = styled.div`
  align-items: center;
  background-image: url(${blobDarkLarge});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
`;
