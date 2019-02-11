import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Color, Typography } from '../../styles';

import RadioButton from '../RadioButton';

interface CtaProps {
  isDisabled?: boolean;
}

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 25px 30px 25px;
  width: 100vw;
`;

export const Cta = styled(Link)<CtaProps>`
  ${Typography.TypeStyleEnif}

  background-color: transparent;
  border-radius: 3px;
  border: none;
  color: ${Color.JUPITER};
  cursor: pointer;
  margin-left: 16px;
  padding: 8px;
  text-transform: uppercase;

  &:hover {
    color: ${Color.SUN};
  }

  ${({ isDisabled }) => {
    if (!isDisabled) {
      return `
        &:hover {
          color: ${Color.SUN};
        }
      `;
    }

    return `
      cursor: default;
      opacity: 0.5;

      &:hover {
        color: ${Color.JUPITER};
      }
    `;
  }}
`;

export const Content = styled.div`
  flex: 1;
`;

export const Window = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  align-items: center;
  position: relative;
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

  ${StyledRadioButton} + ${StyledRadioButton} {
    margin-left: 15px;
  }

  ${Group} + ${Group} {
    margin-left: 67px;
  }
`;
