import { Form } from 'formik';
import styled from 'styled-components';

export const Label = styled.label`
  cursor: pointer;
  display: flex;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  align-items: flex-end;
`;

export const StyledForm = styled(Form)`
  height: 80px;
  margin: 12px 0 36px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
