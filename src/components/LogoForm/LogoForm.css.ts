import { Form } from 'formik';
import styled from 'styled-components';

import { Color } from '../../styles';

import Button from '../Button';

export const Anchor = styled.div`
  font-size: 10px;
  margin-bottom: 10px;
  text-decoration: underline;
`;

export const Input = styled.input`
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  width: 0.1px;
  z-index: -1;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

export const Label = styled.label`
  cursor: pointer;
  display: flex;
  margin-bottom: 15px;
`;

export const Placeholder = styled.div`
  font-size: 8px;
  color: ${Color.EMPEROR};
`;

export const StyledButton = styled(Button)`
  + button {
    margin-left: 10px;
  }
`;

export const StyledForm = styled(Form)`
  display: inline-block;
`;

export const Wrapper = styled.div``;
