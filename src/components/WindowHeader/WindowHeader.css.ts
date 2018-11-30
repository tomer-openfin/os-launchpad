import styled from 'styled-components';

import * as XIcon from '../../assets/TinyX.svg';

import { Color } from '../../styles';

export const Header = styled.div`
  -webkit-app-region: drag !important;
  background-color: ${Color.LIGHTER_GREY};
  border: 1px solid ${Color.LIGHTER_GREY};
  display: flex;
  height: 20px;
  justify-content: flex-end;
  text-align: right;
  width: 100%;
`;

export const CloseButton = styled.button`
  -webkit-app-region: no-drag !important;
  align-items: center;
  background: red;
  border: none;
  display: flex;
  height: 100%;
  justify-content: center;
  margin: 0;
  outline: none;
  width: 40px;
`;

export const CloseIcon = styled.span`
  background-color: white;
  height: 6px;
  mask-position: center;
  mask-repeat: no-repeat;
  mask-image: url(${XIcon});
  width: 7px;
`;
