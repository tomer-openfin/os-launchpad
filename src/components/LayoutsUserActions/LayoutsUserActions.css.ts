import styled from 'styled-components';

import { Color, Typography } from '../../styles';
import SvgIcon from '../SvgIcon';

interface Props {
  validResult: boolean;
}

export const CheckIcon = styled(SvgIcon)`
  position: absolute;
  top: 3px;
  right: 0;
  flex-shrink: 0;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  padding: 0;
  margin: 0;
  min-width: 118px;
`;

export const UndoText = styled.p`
  ${Typography.TypeStyleEnif}

  color: ${Color.MERCURY};
  text-transform: uppercase;

  &:hover {
    color: ${Color.JUPITER};
    cursor: pointer;
  }
`;

export const Text = styled.p`
  ${Typography.TypeStyleNaos}

  color: ${Color.MERCURY};
  text-transform: uppercase;
`;

export const SubmitButton = styled.button`
  height: 0;
  margin: 0;
  padding: 0;
  visibility: hidden;
  width: 0;

  & > ${CheckIcon} {
    visibility: visible;
  }
`;

export const Input = styled.input`
  ${Typography.TypeStyleCanopus}

  background-color: transparent;
  border: 0px;
  color: ${Color.SUN};
  max-height: 21px;
  max-width: 123px;
  outline: none;
  padding: 0 15px 0 0;
  box-shadow: inset 0 -1px ${Color.JUPITER};
`;

export const InputWrapper = styled.form`
  position: relative;
`;

export const SaveIcon = styled(SvgIcon)<Props>`
  flex-shrink: 0;
  margin-left: 8px;

  ${({ validResult }) =>
    validResult &&
    `
      background-color: ${Color.JUPITER};

      &:hover {
        background-color: ${Color.JUPITER};
      }
    `};
`;

export const UserActions = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  max-height: 48px;
  width: 100%;
  padding: 11px 11px 14px 0px;
`;
