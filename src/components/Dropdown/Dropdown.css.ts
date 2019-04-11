import styled from 'styled-components';
import { Color, Typography } from '../../styles';

export const Wrapper = styled.div<{ width?: number | string }>`
  ${Typography.TypeStyleProcyon}
  background-color: ${Color.SEDNOID};
  color: ${Color.SUN}

  ${({ width }) => `width: ${width || 140}px;`}
`;

export const Display = styled.div`
  align-items: center;
  background-color: ${Color.SEDNOID};
  box-sizing: border-box;
  display: flex;
  height: 34px;
  justify-content: space-between;
  padding: 8px;
`;

export const Indicator = styled.div<{ open: boolean }>``;

export const OptionsWrapper = styled.div<{ width?: number | string; open: boolean }>`
  background-color: ${Color.SEDNOID};
  opacity: 1;
  padding-bottom: 14px;
  position: absolute;
  z-index: 1;

  ${({ open, width }) => `
    visibility: ${open ? 'visible' : 'hidden'};
    width: ${width || 140}px;
  `}
`;

export const Option = styled.div<{ chosen: boolean }>`
  align-items: center;
  background-color: ${({ chosen }) => (chosen ? Color.SEDNOID_HOVER : Color.SEDNOID)};
  box-sizing: border-box;
  display: flex;
  height: 25px;
  padding: 8px;

  &:hover {
    background-color: ${Color.SEDNOID_HOVER};
  }
`;
