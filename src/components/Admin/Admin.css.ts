import styled, { css } from 'styled-components';

import { NavLink } from 'react-router-dom';
import { Color } from '../../styles';

const TABS_SIZE = '25px';

// placeholder tabs until design finalized
export const TabsWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  position: absolute;
  top: 0;
  left: 0;
  height: ${TABS_SIZE};
`;

const activeClassName = 'active-link';

export const TabLink = styled(NavLink).attrs({ activeClassName })`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  background: ${Color.DUSTY_GREY};
  color: ${Color.SEAGULL};
  text-decoration: none;
  font-weight: 200;
  font-size: 10px;

  &:hover {
    background: ${Color.LIGHTER_GREY};
  }

  &.${activeClassName} {
    background: ${Color.SEAGULL};
    color: ${Color.DUSTY_GREY};
  }
`;

export const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: ${TABS_SIZE};
  overflow: hidden;
`;
