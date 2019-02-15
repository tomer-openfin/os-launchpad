import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Color, hexToRgba, Typography } from '../../styles';

import * as EditIcon from '../../assets/Edit.svg';
import * as TrashIcon from '../../assets/Trash.svg';

import RadioButton from '../RadioButton';

export const Header = styled.h3`
  ${Typography.TypeStyleArcturus};

  color: ${Color.SUN};
`;

export const Wrapper = styled.div`
  padding: 20px;
  height: 100%;
  overflow-y: auto;
`;

export const StyledRadioButton = styled(RadioButton)`
  margin-right: 15px;
`;

export const DeleteIconLink = styled(Link)<{ disabled?: boolean }>`
  background-color: ${Color.MERCURY};
  mask: url(${TrashIcon});
  mask-size: contain;
  mask-position: center;
  mask-repeat: no-repeat;
  color: ${Color.COMET};
  margin-left: 10px;
  height: 30px;
  width: 30px;

  &:hover {
    background-color: ${Color.MARS};
    cursor: pointer;
  }

  ${({ disabled }) =>
    disabled &&
    `
    background-color: ${hexToRgba(Color.MERCURY, 0.4)} !important;
    cursor: default;
  `}
`;

export const EditIconLink = styled(Link)`
  background-color: ${Color.MERCURY};
  mask: url(${EditIcon});
  mask-size: contain;
  mask-position: center;
  mask-repeat: no-repeat;
  color: ${Color.COMET};
  border-radius: 3px;
  margin-left: 10px;
  height: 30px;
  width: 30px;

  &:hover {
    background-color: ${Color.JUPITER};
    cursor: pointer;
  }

  &:disabled {
    background-color: ${Color.PLUTO};
    cursor: default;
  }
`;

export const Row = styled.div`
  margin-bottom: 10px;
`;
