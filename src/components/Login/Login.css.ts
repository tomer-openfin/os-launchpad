import styled from 'styled-components';
import { Color } from '../../styles/index';

export const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  -webkit-app-region: drag;
`;

export const FieldWrapper = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px;

  & input {
    color: ${Color.MERCURY};
    background: ${Color.VOID};
    border: 1px solid ${Color.MERCURY};
    border-radius: 3px;
    padding: 5px 25px;
    outline: none;
    width: 200px;

    &:hover,
    &:active {
      color: ${Color.COMET};
      background: ${Color.ASTEROID_BELT};
      border-color: ${Color.COMET};
    }
    &:focus {
      color: ${Color.NEBULA};
      background: ${Color.ASTEROID_BELT};
      border-color: ${Color.NEBULA};
    }
  }
`;

export const ResponseMessage = styled.div<{ error: boolean }>`
  color: ${props => (props.error ? Color.MARS : Color.SATURN)};
  position: absolute;
  bottom: 10px;
  height: 60px;
  font-size: 12px;
  padding: 25px;
  text-align: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  display: flex;
`;

export const CTA = styled.button`
  height: 24px;
  font-size: 9px;
  width: 200px;
  padding: auto;
  color: ${Color.KUIPER_BELT};
  background: ${Color.MERCURY};
  border: 1px solid ${Color.MERCURY};
  border-radius: 3px;
  outline: none;
  cursor: pointer;

  &:hover {
    color: ${Color.KUIPER_BELT};
    background: ${Color.COMET};
    border-color: ${Color.COMET};
  }
`;
