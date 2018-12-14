import styled from 'styled-components';

import * as XIcon from '../../assets/TinyX.svg';

import { Color } from '../../styles';

export const Header = styled.div`
  -webkit-app-region: drag !important;
  background-color: ${Color.CHARCOAL};
  color: ${Color.SUN}
  display: flex;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  width: 100%;
`;

export const Title = styled.div`
  padding: 20px;
`;
