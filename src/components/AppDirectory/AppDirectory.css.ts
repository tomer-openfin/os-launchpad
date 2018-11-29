import styled from 'styled-components';

import { Color } from '../../styles';

export const Wrapper = styled.div`
  background: ${Color.CHARCOAL};
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const Directory = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 50px);
  overflow-y: auto;
  overflow-x: hidden;
`;

export const SearchHeader = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  z-index: 3;
  background: ${Color.DUSTY_GREY};
  border-bottom: 1px solid ${Color.SEAGULL};
`;

export const SearchInput = styled.input`
  color: ${Color.WHITE};
  font-size: 20px;
  font-weight: 200;
  border: none;
  outline: none;
  background: ${Color.TRANSPARENT};
`;
