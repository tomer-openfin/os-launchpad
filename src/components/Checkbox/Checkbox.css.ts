import styled from 'styled-components';

import * as checkedIcon from '../../assets/Checked.svg';
import * as uncheckedIcon from '../../assets/Unchecked.svg';

import { ADMIN_FORMS_ENTER_DURATION } from '../../utils/adminForms';

import Label, { LABEL_TRANSITION_DELAY, LabelWrapper } from '../Label';

interface CheckedProps {
  checked: boolean;
}

export const StyledLabel = styled(Label)<{ index: number }>`
  align-items: center;
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;

  ${({ index }) => index >= 0 && `transition-delay: ${ADMIN_FORMS_ENTER_DURATION + index * LABEL_TRANSITION_DELAY}ms !important;`}

  ${LabelWrapper} {
    margin-bottom: 0;
  }
`;

export const CheckboxUI = styled.div<CheckedProps>`
  background-image: url(${props => (props.checked ? checkedIcon : uncheckedIcon)});
  background-position: center;
  background-repeat: no-repeat;
  height: 19px;
  margin-right: 10px;
  width: 19px;
`;

export const HiddenInput = styled.input`
  opacity: 0;
  position: absolute;
`;
