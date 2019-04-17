import Select from 'react-select';
import styled from 'styled-components';

import { Color, Typography } from '../../styles';

export const StyledSelect = styled(Select)`
  ${Typography.TypeStyleProcyon}
  color: ${Color.SUN};

  & .react-select__control {
    background-color: ${Color.SEDNOID};
    border-radius: 0;
    border: none;
    min-height: 0;
    padding-bottom: 3px;
    padding-top: 3px;

    &--is-focused {
      box-shadow: none;
    }

    &:hover {
      border: none;
    }
  }
  & .react-select__single-value {
    color: ${Color.SUN};
  }

  & .react-select__menu-list {
    background-color: ${Color.SEDNOID};
    padding-bottom: 14px;
    padding-top: 0;
  }

  & .react-select__menu {
    margin-top: 0;
    box-shadow: none;
  }

  & .react-select__indicator-separator {
    display: none;
  }

  & .react-select__option {
    align-items: center;
    background-color: ${Color.SEDNOID};
    display: flex;
    padding: 1.5px 8px;

    &:hover {
      background-color: ${Color.SEDNOID_HOVER};
    }

    &--is-selected, &--is-focused {
      background-color: ${Color.SEDNOID_HOVER};
    }
  }
`;
