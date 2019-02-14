import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Color, Typography } from '../../styles';

import RadioButton from '../RadioButton';

interface CtaProps {
  isDisabled?: boolean;
}

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

export const Group = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 30px;
`;

export const Heading = styled.div`
  ${Typography.TypeStyleArcturus}

  color: ${Color.SUN};
  padding-bottom: 5px;
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

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1.25;

  :first-child {
    padding-top: 22px;
  }
`;
