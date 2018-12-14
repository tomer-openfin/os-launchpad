import styled from 'styled-components';

import { Color } from '../../styles';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const Directory = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 60px);
  overflow-y: auto;
  overflow-x: hidden;
`;

export const SearchHeader = styled.div`
  display: flex;
  height: 100%;
  flex: 1;
  z-index: 3;
`;

export const SearchInput = styled.input`
  color: ${Color.SUN};
  font-size: 20px;
  font-weight: 100;
  border: none;
  outline: none;
  background: ${Color.VOID};
`;

export const CTA = styled.div`
  background: ${Color.KUIPER_BELT};
  color: ${Color.MERCURY};
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: ${Color.PLUTO};
    color: ${Color.COMET};
  }
`;

export const Row = styled.div`
  display: flex;
  width: 100%;
  position: relative;

  &:before {
    background-color: ${Color.MERCURY};
    opacity: 0.25;
    content: '';
    height: 1px;
    position: absolute;
    right: 10px;
    left: 10px;
    bottom: 0;
  }
`;
