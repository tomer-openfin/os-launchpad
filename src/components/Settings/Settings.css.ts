import styled from 'styled-components';
import { Color } from '../../styles/index';

export const Window = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const CTA = styled.button`
  width: 50px;
  height: 24px;
  font-size: 9px;
  color: ${Color.SEAGULL};
  background: ${Color.VOID};
  border: 1px solid ${Color.SEAGULL};
  border-radius: 3px;
  outline: none;
  cursor: pointer;
  margin: 5px;

  &:hover {
    color: ${Color.CHARCOAL};
    background: ${Color.SEAGULL};
  }
`;

export const Heading = styled.div`
  color: ${Color.SUN};
  font-weight: 200;
  padding: 10px;
`;

export const Section = styled.div`
  width: 100vw;
  padding: 10px 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
