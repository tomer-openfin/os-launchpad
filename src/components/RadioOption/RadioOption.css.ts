import styled from 'styled-components';

import { Color } from '../../styles';
import { TypeStyleCanopus } from '../../styles/typography.css';

import Input from '../Input';

export const HiddenInput = styled(Input)`
  height: 19px;
  opacity: 0;
  position: absolute;
  width: 19px;
`;

export const RadioUI = styled.div<{ checked: boolean }>`
  background-color: ${({ checked }) => (checked ? Color.EARTH : Color.ASTEROID_BELT)};
  border-radius: 50%;
  border: 1px solid ${({ checked }) => (checked ? Color.SUN : Color.MERCURY)};
  height: 19px;
  margin-right: 10px;
  pointer-events: none;
  width: 19px;
`;

export const LabelText = styled.div`
  ${TypeStyleCanopus}

  color: ${Color.SUN};
`;

export const RadioWrapper = styled.div`
  display: flex;
  margin-top: 4px;
  position: relative;
`;
