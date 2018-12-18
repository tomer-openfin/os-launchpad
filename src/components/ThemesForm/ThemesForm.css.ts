import styled from 'styled-components';

import Button from '../Button';

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-size: 10px;
  margin-bottom: 10px;
`;

export const Select = styled.select`
  align-self: flex-start;
  margin-bottom: 30px;
`;

export const StyledButton = styled(Button)`
  + button {
    margin-left: 10px;
  }
`;

export const Wrapper = styled.div``;
