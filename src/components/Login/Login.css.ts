import styled from 'styled-components';

import * as blobDarkLarge from '../../assets/BlobDarkLarge.svg';

import { Color, Typography } from '../../styles';
import { getBackgroundColor } from '../ConnectedThemeProvider/utils';

import Borders from '../Borders';
import Button from '../Button';
import Logo from '../Logo';

export const Wrapper = styled.div`
  -webkit-app-region: drag;
  align-items: center;
  background-image: url(${blobDarkLarge});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  width: 100vw;
`;

export const PreviewWrapper = styled(Wrapper)`
  background-color: ${getBackgroundColor};
  height: 100%;
  max-height: 100%;
  max-width: 100%;
  opacity: 1;
  pointer-events: none;
  width: 100%;
`;

export const PreviewBorders = styled(Borders)`
  max-height: 100%;
  max-width: 100%;
`;

export const LogoWrapper = styled.div`
  margin-bottom: 24px;
`;
export const StyledLogo = styled(Logo)`
  margin-bottom: 24px;
`;

export const FormWrapper = styled.div`
  width: 307px;
`;

export const ContentWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  margin: 24px 0 42px 0;
  width: 100%;
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
