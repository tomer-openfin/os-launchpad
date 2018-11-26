import styled from 'styled-components';

import { NavLink } from 'react-router-dom';
import { Color } from '../../styles';

const TABS_SIZE = '25px';

export const ContentWrapper = styled.div`
  background-color: ${Color.ALTO};
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  width: 100%;
`;

const activeClassName = 'active-link';
export const TabLink = styled(NavLink).attrs({ activeClassName })`
  align-items: center;
  background: ${Color.DUSTY_GREY};
  color: ${Color.SEAGULL};
  display: flex;
  flex: 1;
  font-size: 10px;
  font-weight: 200;
  height: 100%;
  justify-content: center;
  outline: none;
  text-decoration: none;

  &:hover {
    background: ${Color.LIGHTER_GREY};
  }

  &.${activeClassName} {
    background: ${Color.SEAGULL};
    color: ${Color.DUSTY_GREY};
  }
`;

// placeholder tabs until design finalized
export const TabsWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  height: ${TABS_SIZE};
  justify-content: space-evenly;
  width: 100%;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;
