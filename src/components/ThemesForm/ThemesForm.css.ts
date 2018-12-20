import styled from 'styled-components';

import { Color } from '../../styles';
import { TypeStyleSirius } from '../../styles/typography.css';

export const Select = styled.select`
  ${TypeStyleSirius};

  background-color: ${Color.KUIPER_BELT};
  color: ${Color.MERCURY};
  height: 36px;
  width: 250px;
  padding: 0 10px;
  outline: none;
  border: none;
  border-radius: 3px;
`;

export const Option = styled.option`
  outline: none;
  border: none;
`;
