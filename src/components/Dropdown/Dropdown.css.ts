import Select from 'react-select';
import styled from 'styled-components';

import { Color, Typography } from '../../styles';

export const Wrapper = styled.div<{ width?: number | string }>`
  ${Typography.TypeStyleProcyon}
  background-color: ${Color.SEDNOID};
  color: ${Color.SUN};

  ${({ width }) => `width: ${width || 140}px;`}
`;

export const Display = styled.div`
  align-items: center;
  background-color: ${Color.SEDNOID};
  display: flex;
  justify-content: space-between;
  padding: 6px 8px;
`;

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
  display: flex;
  padding: 1.5px 8px;

  &:hover {
    background-color: ${Color.SEDNOID_HOVER};
  }
`;

export const StyledSelect = styled(Select)`
  ${Typography.TypeStyleProcyon}
  background-color: ${Color.SEDNOID};
  color: ${Color.SUN};

  & .react-select__control {
    /* ${Typography.TypeStyleProcyon} */
    background-color: ${Color.SEDNOID};
    border-radius: 0;
    border: none;
    min-height: 0;
    /* color: ${Color.SUN}; */

    &--is-focused {
      /* border: none;
      border-color: transparent; */
      box-shadow: none;
    }
    &:hover {
      border: none;
    }
  }
  & .react-select__single-value {
    color: ${Color.SUN};
  }

  & .react-select__value-container {
    padding-top: 0;
    padding-bottom: 0;
  }


  & .react-select__indicators {
  }

  & .react-select__menu-list {
    background-color: ${Color.SEDNOID};
    padding-bottom: 14px;
  }

  & .react-select__menu {
    margin-top: 0;
    box-shadow: none;
  }

  & .react-select__indicator-separator {
    display: none;
  }

  & .react-select__option {
    background-color: ${Color.SEDNOID};
    align-items: center;
    display: flex;
    padding: 1.5px 8px;


    &:hover {
      background-color: ${Color.SEDNOID_HOVER};
    }

    &--is-selected {
      background-color: ${Color.SEDNOID_HOVER};
    }
  }
`;
