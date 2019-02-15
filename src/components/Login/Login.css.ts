import { Form } from 'formik';
import styled from 'styled-components';

import * as blobDarkLarge from '../../assets/BlobDarkLarge.svg';

import { Color, Typography } from '../../styles';

import Button from '../Button';
import Logo from '../Logo';

export const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  -webkit-app-region: drag;
  background-image: url(${blobDarkLarge});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

export const LogoWrapper = styled.div`
  margin-bottom: 24px;
`;
export const StyledLogo = styled(Logo)`
  margin-bottom: 24px;
`;

export const FormWrapper = styled(Form)`
  width: 307px;
`;

export const ContentWrapper = styled.div`
  margin: 24px 0 42px 0;
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ResponseMessage = styled.div<{ error: boolean }>`
  ${Typography.TypeStyleDeneb}

  align-items: center;
  bottom: 0;
  color: ${({ error }) => (error ? Color.MARS : Color.SATURN)};
  display: flex;
  height: 34px;
  justify-content: center;
  padding: 0 10px;
  position: absolute;
  text-align: center;
  width: 100%;
`;

export const CTA = styled(Button)<{ extraSpace?: boolean; fullWidth?: boolean }>`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : '109px')};
  ${({ extraSpace }) => extraSpace && 'margin-top: 9px;'}
`;
