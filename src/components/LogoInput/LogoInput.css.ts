import styled from 'styled-components';

import { Color } from '../../styles';

import Button from '../Button';

export const Anchor = styled.div`
  font-size: 10px;
  margin-bottom: 7px;
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
  max-width: 180px;
`;

export const Label = styled.label`
  cursor: pointer;
  display: grid;
  margin-left: 15px;
`;

export const Placeholder = styled.div`
  font-size: 8px;
  color: ${Color.APPLE};
`;

export const StyledButton = styled(Button)`
  + button {
    margin-left: 10px;
  }
`;

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 40px 180px;
  margin-top: -5px;
  max-height: 35px;
  text-transform: none;
`;
