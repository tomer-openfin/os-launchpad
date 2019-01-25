import { Form } from 'formik';
import styled from 'styled-components';

import { ButtonLink } from '../Button/Button.css';

const ResponsiveWidth = `
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
  justify-content: flex-end;
  align-items: center;
  padding-right: 20px;
  padding-top: 16px;

  ${ButtonLink} + button {
    margin-left: 14px;
  }
`;

export const Footer = styled.div`
  align-self: flex-end;
  height: 60px;
`;
