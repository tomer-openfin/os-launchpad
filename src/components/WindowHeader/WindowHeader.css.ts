import styled from 'styled-components';

import { Color } from '../../styles';

export const Header = styled.div`
  -webkit-app-region: drag !important;
  background-color: ${Color.KUIPER_BELT};
  color: ${Color.SUN};
  display: flex;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  width: 100%;
`;

export const Title = styled.div`
  -webkit-app-region: drag !important;
  padding: 20px;
`;
