import styled from 'styled-components';
import * as gradient from '../../assets/gradient.svg';
import * as logo from '../../assets/logo-new.png';

export const Wrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const LogoWrapper = styled.div`
  background: url(${gradient});
  background-size: cover;
  background-repeat: no-repeat;
  height: 67px;
  width: 67px;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-app-region: drag;
`;

export const Logo = styled.div`
  background: url(${logo});
  background-size: contain;
  background-repeat: no-repeat;
  height: 33px;
  width: 33px;
  -webkit-app-region: drag;
`;
