import styled from 'styled-components';

import { Color, Typography } from '../../styles';
import RadioButton from '../RadioButton';
import { RowWrapper } from '../Responsive';
import { Icon } from '../SvgIcon/index';

export const StyledRowWrapper = styled(RowWrapper)`
  margin-bottom: 20px;
`;

export const Group = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  ${Icon} {
    position: absolute;
    right: 0;
    top: -3px;
  }
`;

export const Heading = styled.div`
  ${Typography.TypeStyleArcturus}

  color: ${Color.SUN};
  margin-bottom: 10px;
  white-space: nowrap;
`;

export const Row = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const StyledRadioButton = styled(RadioButton)`
  margin: 0 2.5px;
`;
