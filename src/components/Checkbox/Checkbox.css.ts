import styled from 'styled-components';

import * as checkedIcon from '../../assets/Checked.svg';
import * as uncheckedIcon from '../../assets/Unchecked.svg';

import { Color } from '../../styles';
import { TypeStyleCanopus } from '../../styles/typography.css';

import FormField from '../FormField';

interface CheckedProps {
  checked: boolean;
}

export const FormFieldWrapper = styled(FormField)`
  display: flex;
  flex-direction: row;
  align-items: center;

  & > input {
    display: none;
  }
`;

export const LabelText = styled.div`
  ${TypeStyleCanopus}

  color: ${Color.SUN};
`;

export const CheckboxUI = styled.div<CheckedProps>`
  margin-right: 10px;
  height: 19px;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${props => (props.checked ? checkedIcon : uncheckedIcon)});
  width: 19px;
`;
