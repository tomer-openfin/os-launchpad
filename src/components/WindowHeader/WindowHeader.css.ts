import styled from 'styled-components';

import { Color } from '../../styles';

interface CommonProps {
  backgroundColor?: string;
  justifyContent?: string;
}

export const Header = styled.div<CommonProps>`
  -webkit-app-region: drag !important;
  background-color: ${props => props.backgroundColor || Color.KUIPER_BELT};
  color: ${Color.SUN};
  display: flex;
  height: 60px;
  justify-content: ${props => props.justifyContent || 'space-between'};
  align-items: center;
  text-align: center;
  width: 100%;
`;

export const Title = styled.div`
  -webkit-app-region: drag !important;
  padding: 20px;
`;
