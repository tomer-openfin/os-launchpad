import styled from 'styled-components';

import { Color } from '../../styles';

interface CommonProps {
  backgroundColor?: string;
  justifyContent?: string;
}

export const CtaWrapper = styled.div`
  -webkit-app-region: drag !important;
  align-items: center;
  background: ${Color.VACUUM};
  display: flex;
  height: 100%;
  padding: 0 17.5px;
`;

export const Header = styled.div<CommonProps>`
  -webkit-app-region: drag !important;
  background-color: ${props => props.backgroundColor};
  color: ${Color.SUN};
  display: flex;
  height: 60px;
  justify-content: ${props => props.justifyContent};
  align-items: center;
  text-align: center;
  width: 100%;
`;

export const Title = styled.div`
  -webkit-app-region: drag !important;
  padding: 20px;
`;
