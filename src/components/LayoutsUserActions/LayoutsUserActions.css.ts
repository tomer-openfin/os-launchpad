import styled from 'styled-components';

import { Color, textEllipsis, Typography } from '../../styles';
import SvgIcon from '../SvgIcon';

interface Props {
  validResult: boolean;
}

export const CheckIcon = styled(SvgIcon)`
  ${({ hoverColor }) => `
    &:hover {
      background-color: ${hoverColor};
    }
  `}
`;

export const SaveIcon = styled(SvgIcon)<Props>`
  flex-shrink: 0;
  margin-right: 5px;

  ${({ validResult }) =>
    validResult &&
    `
      background-color: ${Color.JUPITER};

      &:hover {
        background-color: ${Color.JUPITER};
      }
    `};
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex: 1;
  justify-content: space-between;
  overflow: hidden;
`;

export const UndoText = styled.p`
  ${Typography.TypeStyleEnif}
  ${textEllipsis}

  color: ${Color.MERCURY};
  margin-left: 5px;
  margin: 0;
  text-transform: uppercase;

  &:hover {
    color: ${Color.JUPITER};
    cursor: pointer;
  }
`;

export const Text = styled.p`
  ${Typography.TypeStyleNaos}
  ${textEllipsis}

  color: ${Color.MERCURY};
  margin: 0;
  text-transform: uppercase;
`;

export const SubmitButton = styled.button`
  background-color: ${Color.VOID};
  border: none;
  cursor: pointer;
  flex-shrink: 0;
  padding: 0;

  &:disabled {
    display: none;
  }
`;

export const Input = styled.input`
  ${Typography.TypeStyleCanopus}

  background-color: transparent;
  border: none;
  color: ${Color.SUN};
  flex: 1;
  outline: none;
  padding: 1px 3px 1px 0;
  width: 100%;
`;

export const LayoutForm = styled.form`
  border-bottom: 1px solid ${Color.JUPITER};
  display: flex;
  flex: 1;
`;

export const UserActions = styled.div`
  display: flex;
  align-items: center;
  padding: 11px 11px 14px 8px;
`;
