import styled from 'styled-components';

import { Color, getCssValueFromNumberOrString, Typography } from '../../styles';

const TRANSITION_DURATION = 300;

interface TabButton {
  isActive: boolean;
}

interface HeaderProps {
  activeIndex: number;
  height: number | string;
  tabCount: number;
}

export const TabButton = styled.button<TabButton>`
  ${Typography.TypeStyleArcturus}

  align-items: center;
  background-color: ${Color.VOID};
  border: none;
  cursor: pointer;
  display: inline-flex;
  height: 100%;
  justify-content: center;
  outline: none;
  padding: 0;
  transition: color ${TRANSITION_DURATION}ms ease-in-out;
  will-change: color;

  ${({ isActive }) => `
    ${Typography.TypeStyleProcyon}

    color: ${isActive ? Color.SUN : Color.MERCURY};
  `}

  &:hover {
    color: ${Color.SUN};
  }
`;

export const Content = styled.div`
  display: flex;
`;

export const Header = styled.div<HeaderProps>`
  align-items: center;
  background-color: ${Color.VACUUM};
  border-bottom: 2px solid ${Color.MERCURY};
  display: flex;
  flex-shrink: 0;
  position: relative;

  &:after {
    background-color: ${Color.EARTH};
    bottom: -2px;
    content: '';
    display: inline-block;
    height: 2px;
    left: 0;
    pointer-events: none;
    position: absolute;
    transition: transform ${TRANSITION_DURATION}ms ease-in-out;
    will-change: transform;
  }

  ${({ activeIndex, height, tabCount }) => {
    const tabWidth = `${100 / tabCount}%`;
    return `
      height: ${getCssValueFromNumberOrString(height)};

      ${TabButton} {
        flex: 1 0 ${tabWidth};
      }

      &:after {
        transform: translate3d(${activeIndex * 100}%, 0, 0);
        width: ${tabWidth};
      }
    `;
  }}
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
