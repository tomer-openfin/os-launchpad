import styled from 'styled-components';

import { Color, Typography } from '../../styles';
import SearchInput, { Input, SearchIcon } from '../SearchInput';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const Directory = styled.div`
  height: calc(100vh - 60px);
  overflow-x: hidden;
  overflow-y: overlay;
  position: relative;
  width: 100%;

  &:after {
    content: '';
    background-color: ${Color.KUIPER_BELT};
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    width: 60px;
    z-index: -1;
  }
`;

export const StyledSearchInput = styled(SearchInput)`
  border-radius: 0;
  flex: 1;

  ${Input} {
    ${Typography.TypeStylePolaris}
    padding-left: 66px;
  }

  ${SearchIcon} {
    width: 50px;
    height: 50px;
    left: 16px;
  }
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
