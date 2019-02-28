import { Form } from 'formik';
import styled from 'styled-components';

import { Color } from '../../styles';
import { TypeStyleSirius } from '../../styles/typography.css';

export const StyledForm = styled(Form)`
  height: 80px;
  margin: 12px 0 36px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Select = styled.select`
  ${TypeStyleSirius};

  background-color: ${Color.KUIPER_BELT};
  color: ${Color.MERCURY};
  height: 36px;
  width: 250px;
  padding: 0 10px;
  outline: none;
  border: none;
  border-radius: 3px;
`;

export const Option = styled.option`
  outline: none;
  border: none;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  align-items: flex-end;
`;
