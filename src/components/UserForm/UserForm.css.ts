import styled, { css } from 'styled-components';

import { Form } from 'formik';
import { Color } from '../../styles';

const FOOTER_HEIGHT = '60px';

const ResponsiveWidth = css`
  max-width: 469px;
  width: 100%;
  margin: 0 auto;
`;

export const FormWrapper = styled(Form)`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: flex-start;
  width: 100vw;
`;

export const Wrapper = styled.div`
  align-items: center;
  background-color: ${Color.KUIPER_BELT};
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: flex-start;
  width: 100vw;
`;

export const ScrollWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  width: 100%;
  padding-bottom: ${FOOTER_HEIGHT};
  margin-bottom: ${FOOTER_HEIGHT};
  min-height: calc(100% - ${FOOTER_HEIGHT});
`;

export const GridWrapper = styled.div`
  ${ResponsiveWidth}

  display: grid;
  grid-row-gap: 28px;
  grid-template-columns: 1fr;
  padding: 20px;
`;

export const RowWrapper = styled.div<{ height?: string; firstElementWidth?: string; secondElementWidth?: string }>`
  display: grid;
  grid-template-columns: ${props => props.firstElementWidth || '1fr'} ${props => props.secondElementWidth || '1fr'};
  grid-template-rows: ${props => props.height || '62px'};
  grid-column-gap: 20px;
`;

export const ButtonWrapper = styled.div`
  ${ResponsiveWidth}

  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
  padding-right: 20px;

  & > button:nth-child(2) {
    margin-left: 14px;
  }
`;

export const ErrorWrapper = styled.div`
  ${ResponsiveWidth}

  bottom: ${FOOTER_HEIGHT};
  position: absolute;
`;

export const ErrorResponseMessage = styled.div`
  background-color: ${Color.MARS};
  color: ${Color.SUN};
  font-size: 10px;
  height: auto;
  padding: 5px;
  margin: 0 24px 0 16px;
`;

export const ResponseMessage = styled.div`
  align-items: center;
  background-color: ${Color.SATURN};
  color: ${Color.VACUUM};
  display: flex;
  font-size: 10px;
  justify-content: center;
  padding: 5px;
  width: 100%;
`;

export const PasswordIconWrapper = styled.div`
  align-self: flex-end;
  position: absolute;
  padding: 32px 5px;
`;

export const CheckboxWrapper = styled.div`
  padding-top: 20px;
`;

export const Footer = styled.div`
  background-color: ${Color.OORT_CLOUD};
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  height: ${FOOTER_HEIGHT};
  display: flex;
  justify-content: flex-end;
  flex-wrap: nowrap;
  padding-right: 8px;
`;

export const RefreshIconWrapper = styled.div`
  padding-top: 25px;
  margin: auto;
`;
