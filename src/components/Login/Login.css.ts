import { Form } from 'formik';
import styled from 'styled-components';

import * as blobDarkLarge from '../../assets/BlobDarkLarge.svg';

import { Color } from '../../styles';

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

export const StyledLogo = styled(Logo)`
  margin-bottom: 24px;
`;

export const FormWrapper = styled(Form)`
  display: grid;
  grid-row-gap: 18px;
  grid-template-columns: 1fr;
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
  color: ${props => (props.error ? Color.MARS : Color.SATURN)};
  position: absolute;
  bottom: 10px;
  height: 30px;
  font-size: 12px;
  text-align: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  display: flex;
`;

export const CTA = styled(Button)`
  width: 109px;
`;
