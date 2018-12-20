import styled from 'styled-components';

import { NavLink } from 'react-router-dom';
import { Color } from '../../styles';

const activeClassName = 'active-link';

export const TabsWrapper = styled.div`
  background-color: ${Color.VACUUM};
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 50px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  max-width: 600px;
  margin: auto;
  flex: 1;
`;

export const TabLink = styled(NavLink).attrs({ activeClassName })`
  align-items: center;
  background-color: ${Color.VACUUM};
  color: ${Color.MERCURY};
  display: flex;
  flex: 1;
  font-size: 10px;
  font-weight: 200;
  justify-content: center;
  outline: none;
  text-decoration: none;
  font-size: 16px;
  border-bottom: 2px solid ${Color.MERCURY};
  height: 100%;

  &:hover {
    background: ${Color.PLUTO};
  }

  &.${activeClassName} {
    border-bottom: 2px solid ${Color.NEBULA};
    color: ${Color.SUN};
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;
