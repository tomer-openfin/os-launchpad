import styled from 'styled-components';
import { Color } from '../../styles/index';

export const Window = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 50px;
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
