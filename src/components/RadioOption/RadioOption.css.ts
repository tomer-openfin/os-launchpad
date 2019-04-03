import styled from 'styled-components';

import { Color } from '../../styles';
import { TypeStyleCanopus } from '../../styles/typography.css';

import Input from '../Input';

export const HiddenInput = styled(Input)`
  height: 0;
  width: 0;
  opacity: 0;
`;

export const RadioUI = styled.div<{ checked: boolean }>`
  margin-right: 10px;
  height: 19px;
  background-color: ${({ checked }) => (checked ? Color.EARTH : Color.ASTEROID_BELT)};
  border: 1px solid ${({ checked }) => (checked ? Color.SUN : Color.MERCURY)};
  width: 19px;
  border-radius: 50%;
`;

export const LabelText = styled.div`
  ${TypeStyleCanopus}

  color: ${Color.SUN};
`;

export const RadioWrapper = styled.div`
  display: flex;
  margin-top: 4px;
`;
