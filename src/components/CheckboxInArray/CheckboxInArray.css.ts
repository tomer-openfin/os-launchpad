import styled from 'styled-components';

import * as checkedIcon from '../../assets/Checked.svg';
import * as uncheckedIcon from '../../assets/Unchecked.svg';

import { Color } from '../../styles/index';
import { TypeStyleCanopus } from '../../styles/typography.css';

interface CheckedProps {
  isChecked: boolean;
}

export const Label = styled.label`
  display: flex;
  align-items: center;
  width: auto;
`;

export const LabelText = styled.div`
  ${TypeStyleCanopus};

  color: ${Color.SUN};
`;

export const CustomCheckbox = styled.div<CheckedProps>`
  margin: 5px 5px 5px 0;
  height: 19px;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${props => (props.isChecked ? checkedIcon : uncheckedIcon)});
  width: 19px;
`;

export const Input = styled.input`
  height: 0;
  width: 0;
  opacity: 0;
`;
