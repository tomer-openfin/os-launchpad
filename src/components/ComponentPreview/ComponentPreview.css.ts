import styled from 'styled-components';
import { TypeStyleProcyon } from '../../styles/typography.css';

import * as WindowsDefaultWallpaper from '../../assets/WindowsDefaultWallpaper.png';
import Borders from '../Borders';
import { getBackgroundColor } from '../ConnectedThemeProvider/utils';
import { Wrapper as LoginWrapper } from '../Login/Login.css';

export const OuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const InnerWrapper = styled.div`
  align-items: center;
  background-image: url(${WindowsDefaultWallpaper});
  box-shadow: inset 0px 0px 0px 22px black;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  max-width: 100%;
  min-width: 100%;
  position: relative;
  width: 100vh;
`;

export const BorderText = styled.div`
  ${TypeStyleProcyon}

  color: white;
  text-transform: uppercase;

  &:first-child {
    position: absolute;
    top: 0;
  }

  &:nth-child(2) {
    position: absolute;
    right: -24px;
    transform-origin: center center;
    transform: rotate(90deg);
  }

  &:nth-child(3) {
    left: -24px;
    position: absolute;
    transform-origin: center center;
    transform: rotate(270deg);
  }

  &:nth-child(4) {
    bottom: 0;
    position: absolute;
  }
`;

export const ComponentWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-height: 80%;
  max-width: 80%;
  height: 80%;
  width: 80%;
  position: relative;

  & formfield {
    border: none;
  }
`;

export const PreviewWrapper = styled.div`
  height: 100%;
  max-height: 100%;
  max-width: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${Borders} {
    height: 100%;
    max-height: 100%;
    max-width: 100%;
    width: 100%;
  }

  ${LoginWrapper} {
    background-color: ${getBackgroundColor};
    height: 100%;
    max-height: 100%;
    max-width: 100%;
    opacity: 1;
    pointer-events: none;
    width: 100%;
  }
`;

export const Disabler = styled.fieldset`
  border: none;
  height: 100%;
  max-height: 100%;
  max-width: 100%;
  width: 100%;
`;
