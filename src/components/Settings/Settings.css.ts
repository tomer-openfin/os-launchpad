import styled from 'styled-components';

import { Color, Typography } from '../../styles';

import Button from '../Button';
import RadioButton from '../RadioButton';

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 25px 30px 25px;
  width: 100vw;
`;

export const Window = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const CTA = styled(Button)`
  margin: 5px;
`;

export const StyledRadioButton = styled(RadioButton)``;

export const Group = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Heading = styled.div`
  ${Typography.TypeStyleArcturus}

  color: ${Color.SUN};
  padding: 10px;
  white-space: nowrap;
`;

export const Row = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 10px 0;
  width: 100%;
`;

export const Section = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 25px;
  width: 100vw;

  ${StyledRadioButton} + ${StyledRadioButton} {
    margin-left: 15px;
  }

  ${Group} + ${Group} {
    margin-left: 67px;
  }
`;
