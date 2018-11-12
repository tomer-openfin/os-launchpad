import styled, { css } from 'styled-components';
import { Color } from '../../styles/index';

export const Wrapper = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ErrorMessage = styled.p`
  color: red;
`;

export const CTA = styled.button`
  width: 100px;
  height: 24px;
  font-size: 9px;
  color: ${Color.SEAGULL};
  background: ${Color.TRANSPARENT};
  border: 1px solid ${Color.SEAGULL};
  border-radius: 3px;
  outline: none;
  cursor: pointer;

  &:hover {
    color: ${Color.CHARCOAL};
    background: ${Color.SEAGULL};
  }
`;
