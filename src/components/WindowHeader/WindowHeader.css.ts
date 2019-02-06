import styled from 'styled-components';

import { Color } from '../../styles';

interface CommonProps {
  backgroundColor?: string;
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
  align-items: center;
  background-color: ${props => props.backgroundColor};
  color: ${Color.SUN};
  display: flex;
  flex-shrink: 0;
  height: 60px;
  justify-content: space-between;
  text-align: center;
  width: 100%;
`;

export const Children = styled.div`
  -webkit-app-region: drag !important;
  align-items: center;
  display: flex;
  flex: 1;
  height: 100%;
  justify-content: flex-start;
  text-align: center;
`;

export const Title = styled.div`
  -webkit-app-region: drag !important;
  padding: 20px;
`;
