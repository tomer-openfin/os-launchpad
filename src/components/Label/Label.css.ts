import styled from 'styled-components';

import { Color, Typography } from '../../styles';
import { ADMIN_FORMS_ENTER_DURATION } from '../../utils/adminForms';

export const LABEL_TRANSITION_CLASSNAMES = 'label-transition';
export const LABEL_TRANSITION_DURATION = 300;
export const LABEL_TRANSITION_DELAY = 100;
export const LABEL_EASING_FUNCTION = 'ease-in-out';

export const ErrorWrapper = styled.div`
  bottom: -20px;
  left: 0;
  position: absolute;
`;

export const LabelWrapper = styled.div`
  ${Typography.TypeStyleArcturus}

  color: ${Color.SUN};
  margin-bottom: 5px;
`;

export const Wrapper = styled.label<{ index: number }>`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  position: relative;

  ${({ index }) => index >= 0 && `transition-delay: ${ADMIN_FORMS_ENTER_DURATION + index * LABEL_TRANSITION_DELAY}ms !important;`}
`;
