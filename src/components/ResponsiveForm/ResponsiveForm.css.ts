import { Form } from 'formik';
import styled, { css } from 'styled-components';

import { Color } from '../../styles';
import Button from '../Button';

export const FOOTER_HEIGHT = '60px';

export const ResponsiveWidth = css`
  max-width: 469px;
  width: 100%;
  margin: 0 auto;
`;

export const FormWrapper = styled(Form)`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-start;
  width: 100%;
  position: relative;
`;

export const ScrollWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  width: 100%;
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

export const ButtonWrapper = styled.div`
  ${ResponsiveWidth}

  display: flex;
  flex-wrap: nowrap;
  flex-direction: row-reverse;
  justify-content: flex-start;
  align-items: center;
  padding-right: 20px;

  ${Button} {
    margin-left: 14px;
  }
`;

export const Footer = styled.div<{ color?: Color }>`
  background-color: ${({ color }) => color || Color.OORT_CLOUD};
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  height: ${FOOTER_HEIGHT};
  display: flex;
  justify-content: flex-end;
  flex-wrap: nowrap;
  padding-right: 8px;
  z-index: 1;
`;
