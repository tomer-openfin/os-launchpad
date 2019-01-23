import styled from 'styled-components';

import { Color } from '../../styles';
import { TypeStyleCanopus } from '../../styles/typography.css';

import FormField from '../FormField';

interface CheckedProps {
  checked: boolean;
}

export const FormFieldWrapper = styled(FormField)`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  & > input {
    display: none;
  }
`;

export const LabelText = styled.div`
  ${TypeStyleCanopus}

  color: ${Color.SUN};
`;

export const RadioUI = styled.div<CheckedProps>`
  margin-right: 10px;
  height: 19px;
  background-color: ${({ checked }) => (checked ? Color.EARTH : Color.ASTEROID_BELT)};
  border: 1px solid ${({ checked }) => (checked ? Color.SUN : Color.MERCURY)};
  width: 19px;
  border-radius: 50%;
`;

export const RadioWrapper = styled.div`
  display: flex;
  margin-top: 4px;
`;
