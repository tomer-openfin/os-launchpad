import styled from 'styled-components';
import { Color, Typography } from '../../styles/index';
import RadioButton from '../RadioButton/index';
import { RowWrapper } from '../Responsive/index';

export const StyledRowWrapper = styled(RowWrapper)`
  margin-bottom: 20px;
`;

export const Group = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Heading = styled.div`
  ${Typography.TypeStyleArcturus}

  color: ${Color.SUN};
  padding-bottom: 5px;
  white-space: nowrap;
  display: flex;
  align-items: center;
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
