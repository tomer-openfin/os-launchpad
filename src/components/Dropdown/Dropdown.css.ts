import styled, { css } from 'styled-components';
import { Color, hexToRgba, Typography } from '../../styles';

export const Wrapper = styled.div<{ width?: number | string }>`
  ${Typography.TypeStyleProcyon}

  ${({ width }) => `width: ${width || 140}px;`}

  background-color: ${Color.SEDNOID};
`;

export const Display = styled.div`
  align-items: center;
  background-color: ${Color.SEDNOID};
  display: flex;
  height: 40px;
  justify-content: space-between;
  padding: 8px 5px;
`;

export const Indicator = styled.div<{ open: boolean }>``;

export const OptionsWrapper = styled.div<{ width?: number | string; open: boolean }>`
  ${({ open, width }) => `
    visibility: ${open ? 'visible' : 'hidden'};
    width: ${width || 140}px;
  `}

  background-color: ${Color.SEDNOID};
  padding-bottom: 8px;
  position: absolute;
`;

export const Option = styled.div`
  align-items: center;
  display: flex;
  height: 25px;
  padding: 8px 5px;

  &:hover {
    background-color: ${hexToRgba(Color.SEDNOID, 0.15)};
  }
`;
