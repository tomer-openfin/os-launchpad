import styled from 'styled-components';

import Label, { LABEL_TRANSITION_DELAY } from '../Label';
import RadioButton from '../RadioButton';
import { RowWrapper } from '../Responsive';
import { Icon } from '../SvgIcon/index';

import { Color, Typography } from '../../styles';
import { ADMIN_FORMS_ENTER_DURATION } from '../../utils/adminForms';

export const StyledLabel = styled(Label)`
  margin: auto 0;
`;

export const StyledRowWrapper = styled(RowWrapper)`
  margin-bottom: 20px;
`;

export const Group = styled.div<{ index?: number }>`
  display: flex;
  flex-direction: column;
  position: relative;

  ${({ index }) => index && index >= 0 && `transition-delay: ${ADMIN_FORMS_ENTER_DURATION + index * LABEL_TRANSITION_DELAY}ms !important;`}

  ${Icon} {
    position: absolute;
    right: 0;
    top: -3px;
  }
`;

export const Heading = styled.div`
  ${Typography.TypeStyleArcturus}

  color: ${Color.SUN};
  margin-bottom: 5px;
  white-space: nowrap;
`;

export const Row = styled.div`
  display: flex;
  width: 100%;
`;

export const StyledRadioButton = styled(RadioButton)`
  margin: 0 2.5px;
`;
